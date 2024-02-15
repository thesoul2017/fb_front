import React, {useContext, useEffect, useState} from 'react';
import NavbarLeft from "../components/navBar/navbarLeft/NavbarLeft";
import {Context} from "../index";
import {delBudget, fetchBudget, updateBudget} from "../http/budgetApi";
import {getPageCount} from "../utils/pages";
import Table from "../components/table/Table";
import AddBudget from "../components/addBudget/AddBudget";
import ModalDeleteBudget from "../components/modals/ModalDeleteBudget";
import ModalEditBudget from "../components/modals/ModalEditBudget";
import {toast} from "react-toastify";

const Budget = () => {
    const {user} = useContext(Context);

    // страницы
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const [filter, setFilter] = useState();
    const [sort, setSort] = useState('');

    const [budget, setBudget] = useState();
    const [loadingBudget, setLoadingBudget] = useState(true);

    // модальные окна
    const [visibleEditModal, setVisibleEditModal] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);

    const [itemBudget, setItemBudget] = useState({
        sum: 0,
        date: '',
        type: 1,
        categoryId: 0,
        description: ''
    });

    useEffect(() => {
        getBudget();
    }, [page, limit, sort, filter]);

    const getBudget = () => {
        fetchBudget(user.user.id, page, limit, sort, filter).then(data => {
            setBudget(data);
            setTotalPages(getPageCount(data.count, limit));
        }).finally(() => setLoadingBudget(false));
    }

    const clickFilter = (filter) => {
        setPage(1);
        setFilter(filter);
    }

    const clickEditBtn = (item) => {
        console.log(item);
        setItemBudget(itemBudget => ({...itemBudget, ...item}));
        setVisibleEditModal(true);
    }

    const clickDeleteBtn = (item) => {
        setItemBudget(itemBudget => ({...itemBudget, ...item}));
        setVisibleDeleteModal(true);
    }

    const handleSubmit = async (data) => {
        try {
            await updateBudget(data);
            getBudget();
            toast.success('Запись отредактирована');
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const handleDeleteSubmit = async (data) => {
        try {
            await delBudget(data.id);
            getBudget();
            toast.warn('Запись удалена');
        } catch (e) {
            toast.error(e.message);
        }
    }

    return (
        <div className="content-wrapper">
            <NavbarLeft/>

            <section>
                <div className="block add-budget">
                    <AddBudget handleSubmit={() => {getBudget()}}/>
                </div>

                {!loadingBudget && <Table
                        data={budget}
                        page={page}
                        changePage={setPage}
                        totalPages={totalPages}
                        sort={sort}
                        setSort={setSort}
                        setFilter={clickFilter}
                        isAction={true}
                        clickEditBtn={clickEditBtn}
                        clickDeleteBtn={clickDeleteBtn}
                    />
                }
            </section>

            <ModalEditBudget visible={visibleEditModal} setVisible={setVisibleEditModal}
                             item={itemBudget} handleSubmit={handleSubmit}/>

            <ModalDeleteBudget visible={visibleDeleteModal} setVisible={setVisibleDeleteModal}
                               item={itemBudget} handleSubmit={handleDeleteSubmit}/>

        </div>
    );
};

export default Budget;
