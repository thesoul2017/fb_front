import React, {useContext, useEffect, useState} from 'react';
import Modal from "./modal/Modal";
import Select from "../select/Select";
import {Context} from "../../index";

const ModalEditBudget = ({item, visible, setVisible, handleSubmit}) => {
    const {category} = useContext(Context);

    const [sum, setSum] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState(1);
    const [categoryId, setCategoryId] = useState(item.categoryId);
    const [description, setDescription] = useState(item.description);

    useEffect(() => {
        setSum(item.sum);
        setDate(item.date);
        setType(item.type);
        setCategoryId(item.categoryId);
        setDescription(item.description);
    }, [item]);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit({id: item.id, sum, date, type, categoryId, description});
        setVisible(false);
    }

    const close = (e) => {
        e.preventDefault();
        setVisible(false);
    }

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <form onSubmit={submit}>
                <div className="modal-content modal-column">
                    <h3 className="modal-title">Изменение записи</h3>
                    <div className="content column-input">
                        <div className="input-radio margin-ver-6">
                            <label><input value={1} checked={type === 1} onChange={e => setType(+e.target.value)}
                                          type="radio" name="edit-type"/>Расход</label>
                            <label><input value={2} checked={type === 2} onChange={e => setType(+e.target.value)}
                                          type="radio" name="edit-type"/>Доход</label>
                        </div>

                        <input className="inp" placeholder="Сумма" type="number"
                               value={sum} onChange={e => setSum(e.target.value)}/>

                        <input className="inp margin-ver-6" placeholder="Дата" type="date"
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

                        <input className="inp margin-ver-6" placeholder="Описание" type="text"
                               value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn btn-inv margin-hor-6"
                            disabled={sum === '' || date === '' || categoryId === ''}
                            onClick={submit}>Изменить</button>
                    <button className="btn" onClick={close}>Отмена</button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalEditBudget;
