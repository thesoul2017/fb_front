import React, {useContext, useEffect, useState} from 'react';
import NavbarLeft from "../components/navBar/navbarLeft/NavbarLeft";
import {generateCode} from "../utils/random";
import {
    addUserToGroup,
    createGroup,
    findGroupByCode,
    findGroupByUser,
    removeUserFromGroup
} from "../http/groupApi";
import {Context} from "../index";
import {BiEdit} from "react-icons/bi";
import ModalEditProfile from "../components/modals/ModalEditProfile";
import {updateUser} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {toast} from "react-toastify";

const Setting = observer(() => {
    const {user} = useContext(Context);

    const [code, setCode] = useState('');
    const [group, setGroup] = useState({});
    const [userGroup, setUserGroup] = useState({});
    const [loadingUserGroup, setLoadingUserGroup] = useState(true);

    const [visibleEditModal, setVisibleEditModal] = useState(false);

    const [preUser, setPreUser] = useState({firstName: '', lastName: ''});

    useEffect(() => {
        try {
            findGroupByUser(user.user.id).then(data => {
                if (data.id) {
                    setUserGroup(userGroup => ({...userGroup, ...data}));
                }
            }).finally(() => setLoadingUserGroup(false));
        } catch (e) {
            toast.error(e);
        }
    }, []);

    const assignUserToGroup = async (dataGroup) => {
        setGroup(group => ({...group, ...dataGroup}));

        let dataUserGroup;
        dataUserGroup = await addUserToGroup(user.user.id, dataGroup.id);

        let dataObj = Object.assign(dataUserGroup, {group: dataGroup});

        setUserGroup(userGroup => ({...userGroup, ...dataObj}));
    }

    const clickGenerate = async () => {
        try {
            const code = generateCode(6);

            let dataGroup;
            dataGroup = await createGroup(code);
            await assignUserToGroup(dataGroup);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const clickJoin = async () => {
        try {
            let dataGroup;
            dataGroup = await findGroupByCode(code);
            await assignUserToGroup(dataGroup);
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const clickExit = async () => {
        try {
            await removeUserFromGroup(userGroup.id);
            setGroup({});
            setUserGroup({});
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    const clickEdit = async () => {
        setPreUser(user.asJson);
        setVisibleEditModal(true);
    }

    const handleSubmit = async (data) => {
        try {
            await updateUser(user.user.id, data.firstName, data.lastName);
            user.setFirstName(data.firstName);
            user.setLastName(data.lastName);
            toast.success('Профиль изменен');
        } catch (e) {
            toast.error(e.response.data.message);
        }
    }

    return (
        <div className="content-wrapper">
            <NavbarLeft/>

            <section>
                <div className="block profile-block">
                    <h3 className="title">Профиль</h3>
                    <div className="content">
                        <p>Имя <span>{user.user.first_name}</span></p>
                        <p>Фамилия <span>{user.user.last_name}</span></p>
                        <p>Email <span>{user.user.email}</span></p>
                        <button className="edit" onClick={clickEdit}><BiEdit/></button>
                    </div>
                </div>

                <div className="block family-group-block">
                    <h3 className="title">Семейная группа</h3>
                    {
                        !loadingUserGroup &&
                        <div className="content">
                            {
                                userGroup.id ?
                                    <div className="joined">
                                        <p>Код группы <span>{userGroup.group.code}</span></p>
                                        <button className="btn" onClick={clickExit}>Выйти из группы</button>
                                    </div>
                                    :
                                    <div className="create">
                                        <button className="btn" onClick={clickGenerate}>Создать группу</button>

                                        <div className="join">
                                            <input className="inp margin-ver-6" value={code}
                                                   onChange={e => setCode(e.target.value)} placeholder="Код группы" type="text"/>
                                            <button className="btn btn-inv" onClick={clickJoin}>Войти в группу</button>
                                        </div>
                                    </div>
                            }
                        </div>
                    }
                </div>
            </section>

            <ModalEditProfile visible={visibleEditModal} setVisible={setVisibleEditModal}
                              item={preUser} handleSubmit={handleSubmit}/>
        </div>
    );
});

export default Setting;
