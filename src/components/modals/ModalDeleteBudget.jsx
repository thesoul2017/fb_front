import React from 'react';
import Modal from "./modal/Modal";

const ModalDeleteBudget = ({item, visible, setVisible, handleSubmit}) => {
    const submit = () => {
        handleSubmit(item);
        setVisible(false);
    }

    const close = () => {
        setVisible(false);
    }

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <div className="modal-content">
                <h3 className="modal-title">Удаление записи</h3>
                <p>Вы точно хотите удалить запись?</p>
                <p className="modal-message">{item.sum} руб. от {item.date}</p>
            </div>
            <div className="modal-action">
                <button className="btn btn-inv margin-hor-6" onClick={submit}>Удалить</button>
                <button className="btn" onClick={close}>Отмена</button>
            </div>
        </Modal>
    );
};

export default ModalDeleteBudget;
