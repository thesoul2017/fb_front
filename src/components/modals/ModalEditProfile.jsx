import React, {useEffect, useState} from 'react';
import Modal from "./modal/Modal";

const ModalEditProfile = ({item, visible, setVisible, handleSubmit}) => {
    const [firstName, setFirstName] = useState(item.firstName);
    const [lastName, setLastName] = useState(item.lastName);

    useEffect(() => {
        setFirstName(item.firstName);
        setLastName(item.lastName);
    }, [item]);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit({firstName: firstName, lastName: lastName});
        setVisible(false);
    }

    const close = (e) => {
        e.preventDefault();
        setVisible(false);
    }

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <form onSubmit={submit}>
                <div className="modal-content">
                    <h3 className="modal-title">Изменение профиля</h3>

                    <div className="col-input">
                        <input className="inp margin-ver-6" placeholder="Имя" type="text"
                               value={firstName} onChange={e => setFirstName(e.target.value)}/>

                        <input className="inp margin-ver-6" placeholder="Фамилия" type="text"
                               value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </div>
                </div>
                <div className="modal-action">
                    <button className="btn btn-inv margin-hor-6" disabled={firstName === '' || lastName === ''}
                            onClick={submit}>Изменить</button>
                    <button className="btn" onClick={close}>Отмена</button>
                </div>
            </form>
        </Modal>
    );
};

export default ModalEditProfile;
