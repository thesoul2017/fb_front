import React, {useContext, useEffect, useState} from 'react';
import NavbarLeft from "../components/navBar/navbarLeft/NavbarLeft";
import {findUsersInGroup} from "../http/groupApi";
import {Context} from "../index";
import {
    fetchBudget, fetchBudgetGroupByCategory,
    fetchBudgetGroupByDate,
} from "../http/budgetApi";
import {getPageCount} from "../utils/pages";
import Table from "../components/table/Table";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import TotalCategory from "../components/totalCategory/TotalCategory";
import {toast} from "react-toastify";
import Filter from "../components/filter/Filter";

const BudgetGroup = () => {
    const {user} = useContext(Context);

    const [countUser, setCountUser] = useState(1);

    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [filter, setFilter] = useState();
    const [sort, setSort] = useState('');

    const [budget, setBudget] = useState('');
    const [loadingBudget, setLoadingBudget] = useState(true);

    const [groupByDate, setGroupByDate] = useState({});
    const [groupByCategory, setGroupByCategory] = useState([{}]);

    const [period, setPeriod] = useState();
    const [filterType, setFilterType] = useState('');

    useEffect(() => {
        try {
            findUsersInGroup(user.user.id).then(data => {
                // console.log(data);
                const users = data.message ? user.user.id : data;
                setCountUser(data.length || 1);

                fetchBudget(users, page, limit, sort, filter).then(data => {
                    // console.log(data);
                    setBudget(data);
                    setTotalPages(getPageCount(data.count, limit));
                }).finally(() => setLoadingBudget(false));
            });
        } catch (e) {
            toast.error(e);
        }
    }, [page, limit, sort, filter]);

    const clickFilter = (filter) => {
        setPage(1);
        setFilter(filter);
    }

    useEffect(() => {
        findUsersInGroup(user.user.id).then(data => {
            const users = data.message ? user.user.id : data;

            fetchBudgetGroupByDate(users, period).then(data => {
                setGroupByDate(data);
            });

            fetchBudgetGroupByCategory(users, period).then(data => {
                setGroupByCategory(data);
            });
        });
    }, [period]);

    const onFilter = (filter) => {
        // console.log(filter);
        setPeriod(filter);
    }

    return (
        <div className="content-wrapper">
            <NavbarLeft/>

            <section>
                {
                    !loadingBudget && <React.Fragment>
                        <div className="block">
                            <h3 className="title">Количество человек в группе: {countUser}</h3>
                        </div>

                        <Table
                            data={budget}
                            page={page}
                            changePage={setPage}
                            totalPages={totalPages}
                            sort={sort}
                            setSort={setSort}
                            setFilter={clickFilter}
                            isShowUser={true}
                        />

                        <div className="per-filter">
                            <Filter isRange={false} onChange={onFilter}/>
                        </div>

                        <div className="block-row">
                            <DoughnutChart data={groupByCategory} period={period}/>
                            <TotalCategory data={groupByCategory}/>
                        </div>

                        <div className="block-row">
                            <LineChart data={groupByDate} period={period}/>
                            <BarChart data={groupByDate} period={period}/>
                        </div>

                    </React.Fragment>
                }
            </section>
        </div>
    );
};

export default BudgetGroup;
