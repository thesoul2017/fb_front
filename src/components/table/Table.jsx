import React, {useState} from 'react';
import css from './Table.module.css';
import {
    BsArrowDownCircle,
    BsArrowUpCircle,
} from "react-icons/bs";
import Pagination from "../pagination/Pagination";
import Filter from "../filter/Filter";
import Sorting from "../sorting/Sorting";
import {SORTING_VALUES} from "../../consts/sorting";
import {LuEdit2} from "react-icons/lu";
import {TiDeleteOutline} from "react-icons/ti";
import {format} from "date-fns";

const Table = (props) => {
    const [rangeFrom, setRangeFrom] = useState('');
    const [rangeTo, setRangeTo] = useState('');

    const clickEdit = (item) => {
        props.clickEditBtn(item);
    }

    const clickDel = (item) => {
        props.clickDeleteBtn(item);
    }

    return (
        <div className="block table">
            {/*<h3 className="title">Таблица</h3>*/}
            <div className="row-input space-between margin-ver-6">
                <Sorting value={props.sort} options={SORTING_VALUES} defaultValue="Сортировка" onChange={props.setSort}/>

                <Filter rangeFrom={rangeFrom} rangeTo={rangeTo}
                        setRangeFrom={setRangeFrom} setRangeTo={setRangeTo}
                        onChange={props.setFilter}/>
            </div>

            {props.data.count === 0 ?
                <p>Записей нет</p>
                :
                <React.Fragment>
                    <table className={css.table}>
                        <thead>
                        <tr>
                            {/*<th className={css.type}> </th>*/}
                            <th className={css.category}> </th>
                            <th className={css.sum}>Сумма</th>
                            <th className={css.date}>Дата</th>
                            <th>Описание</th>
                            {props.isShowUser && <th className={css.name}>Имя</th>}
                            {props.isAction && <th className={css.action}> </th>}
                        </tr>
                        </thead>
                        <tbody>

                        {props.data.rows.map(item =>
                            <tr key={item.id} className={item.type === 1 ? css.red : css.green}>
                                {/*<td>*/}
                                {/*    {item.type === 1 ?*/}
                                {/*        <BsArrowDownCircle className={css.down}/> :*/}
                                {/*        <BsArrowUpCircle className={css.up}/>*/}
                                {/*    }*/}
                                {/*</td>*/}
                                <td>
                                    <img className={css.icon} src={"./images/icon/" + item.category.icon + ".png"} alt={item.category.name} />
                                </td>
                                <td>
                                    {(item.sum).toFixed(2)} руб.
                                </td>
                                <td>{format(new Date(item.date), 'dd.MM.yyyy')}</td>
                                <td>{item.description}</td>
                                {props.isShowUser && <td>{item.user.first_name}</td>}
                                {props.isAction &&
                                <td>
                                    <button className={css.edit} onClick={() => clickEdit(item)}><LuEdit2/></button>
                                    <button className={css.delete} onClick={() => clickDel(item)}><TiDeleteOutline/></button>
                                </td>
                                }
                            </tr>
                        )}

                        </tbody>
                    </table>

                    <Pagination page={props.page} changePage={props.changePage} totalPages={props.totalPages}/>

                </React.Fragment>
            }
        </div>
    );
};

export default Table;
