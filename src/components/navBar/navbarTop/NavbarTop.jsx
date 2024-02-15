import React, {useContext} from 'react';
import {Context} from "../../../index";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {LOGIN_ROUTE} from "../../../consts/routes";
import css from "./NavbarTop.module.css";
import {RxAvatar} from "react-icons/rx";

const NavbarTop = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE, { replace: false });
    }

    return (
        <nav className={css.nav}>
            <img className={css.logo} src="./images/logo.png" alt="logo" />
            {
                user.isAuth &&
                <div className={css.info}>
                    <p className={css.profile}><span className={css.icon}><RxAvatar/></span> {user.user.first_name} {user.user.last_name}</p>
                    {/*<button className="btn" onClick={logOut}>Выйти</button>*/}
                </div>
            }
        </nav>
    );
});

export default NavbarTop;
