import React, {useContext, useEffect, useState} from 'react';
import NavbarLeft from "../components/navBar/navbarLeft/NavbarLeft";
import {fetchBudgetGroupByCategory, fetchBudgetGroupByDate, fetchBudgetGroupByType} from "../http/budgetApi";
import {Context} from "../index";
import {Chart, LinearScale} from 'chart.js/auto';
import {BsArrowDownCircle, BsArrowUpCircle} from "react-icons/bs";
import {endOfMonth, format, startOfMonth} from "date-fns";
import 'chartjs-adapter-date-fns';
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import {Doughnut} from "react-chartjs-2";
import {interpolateColors} from "../utils/color";
import TotalBudget from "../components/totalBudget/TotalBudget";
import DoughnutChart from "../components/charts/DoughnutChart";
import css from "../components/table/Table.module.css";
import TotalCategory from "../components/totalCategory/TotalCategory";

Chart.register(LinearScale);

const Main = () => {
    const {user} = useContext(Context);

    const [groupByType, setGroupByType] = useState({});
    const [groupByDate, setGroupByDate] = useState({});
    const [groupByCategory, setGroupByCategory] = useState([{}]);

    const [filter, setFilter] = useState([
        format(startOfMonth(new Date()), 'yyyy-MM-dd'),
        format(endOfMonth(new Date()), 'yyyy-MM-dd')
    ]);

    const [loadingGroupByType, setLoadingGroupByType] = useState(true);
    const [loadingGroupByDate, setLoadingGroupByDate] = useState(true);
    const [loadingGroupByCategory, setLoadingGroupByCategory] = useState(true);

    useEffect(() => {
        fetchBudgetGroupByType(user.user.id, filter).then(data => {
            // console.log(data);
            setGroupByType(data);
        }).finally(() => setLoadingGroupByType(false));

        fetchBudgetGroupByDate(user.user.id, filter).then(data => {
            // console.log(data);
            setGroupByDate(data);
        }).finally(() => setLoadingGroupByDate(false));

        fetchBudgetGroupByCategory(user.user.id, filter).then(data => {
            setGroupByCategory(data);
        }).finally(() => setLoadingGroupByCategory(false));
    }, []);

    return (
        <div className="content-wrapper">
            <NavbarLeft/>
            <section>
                <div className="block-transparent">
                    <h3 className="title">Добро пожаловать, {user.user.first_name}</h3>
                    <p>сегодня {format(new Date(),"dd.MM.yyyy")}</p>
                </div>

                <TotalBudget data={groupByType}/>

                <div className="block-row">
                    <DoughnutChart data={groupByCategory}/>
                    <TotalCategory data={groupByCategory}/>
                </div>

                <div className="block-row">
                    <LineChart data={groupByDate}/>
                    <BarChart data={groupByDate}/>
                </div>

            </section>
        </div>
    );
};

export default Main;
