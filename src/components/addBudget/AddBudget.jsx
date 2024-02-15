import React, {useContext, useState} from 'react';
import Select from "../select/Select";
import {Context} from "../../index";
import {addBudget} from "../../http/budgetApi";
import {toast} from "react-toastify";

const AddBudget = ({handleSubmit}) => {
    const {user} = useContext(Context);
    const {category} = useContext(Context);

    const [sum, setSum] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState(1);
    const [categoryId, setCategoryId] = useState('');
    const [description, setDescription] = useState('');

    const click = async () => {
        try {
            await addBudget(sum, date, description, type, categoryId, user.user.id);
            handleSubmit();
            setSum('');
            toast.success('Запись добавлена');
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const clickType = (e) => {
        setType(+e.target.value);
    }

    return (
        <React.Fragment>
            <h3 className="title">Добавление расходов или доходов</h3>
            <div className="content">
                <div className="input-radio">
                    <label>
                        <input value={1} checked={type === 1} onChange={clickType} type="radio"
                                  name="type"/>Расход
                    </label>
                    <label>
                        <input value={2} checked={type === 2} onChange={clickType} type="radio"
                                  name="type"/>Доход
                    </label>
                </div>

                <div className="row-input">
                    <input className="inp" placeholder="Сумма" type="number"
                           value={sum} onChange={e => setSum(e.target.value)}/>

                    <input className="inp margin-hor-6" placeholder="Дата" type="date"
                           value={date} onChange={e => setDate(e.target.value)}/>

                    <Select
                        value={categoryId}
                        onChange={value => setCategoryId(value)}
                        defaultValue="Категория"
                        options={
                            category.categories.map(item => ({
                                    value: item.id,
                                    name: item.name
                                })
                            )}
                    />

                    <input className="inp margin-hor-6" placeholder="Описание" type="text"
                           value={description} onChange={e => setDescription(e.target.value)}/>
                    <button disabled={sum === '' || date === '' || categoryId === ''}
                            className="btn btn-inv" onClick={click}>
                        Добавить
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddBudget;
