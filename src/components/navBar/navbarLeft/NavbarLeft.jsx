import React, {useContext, useState} from 'react';
import {LOGIN_ROUTE, MAIN_ROUTE, REPORT_GROUP_ROUTE, REPORT_ONE_ROUTE, SETTING_ROUTE} from "../../../consts/routes";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {BiBook, BiCalculator, BiCog, BiExit, BiHomeAlt, BiMenu} from "react-icons/bi";
import css from "./NavbarLeft.module.css";
import {Context} from "../../../index";

const NavbarLeft = () => {
    const location = useLocation();
    const [hidden, setHidden] = useState(false);

    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token');
        navigate(LOGIN_ROUTE, { replace: false });
    }

    return (
        <React.Fragment>
            <button className={css.toggle} onClick={() => setHidden(!hidden)}><BiMenu/></button>
            <nav className={hidden ? [css.navHidden, css.nav].join(' ') : css.nav}>
                <ul>
                    <li>
                        <Link to={MAIN_ROUTE}
                              className={location.pathname === MAIN_ROUTE ? [css.link, css.active].join(' ') : css.link}>
                            <BiHomeAlt className={css.icon}/>Главная
                        </Link>
                    </li>
                    <li>
                        <Link to={REPORT_ONE_ROUTE}
                              className={location.pathname === REPORT_ONE_ROUTE ? [css.link, css.active].join(' ') : css.link}>
                            <BiBook className={css.icon}/>Мой бюджет
                        </Link></li>
                    <li>
                        <Link to={REPORT_GROUP_ROUTE}
                              className={location.pathname === REPORT_GROUP_ROUTE ? [css.link, css.active].join(' ') : css.link}>
                            <BiCalculator className={css.icon}/>Статистика
                        </Link></li>
                    <li>
                        <Link to={SETTING_ROUTE}
                              className={location.pathname === SETTING_ROUTE ? [css.link, css.active].join(' ') : css.link}>
                            <BiCog className={css.icon}/>Настройки
                        </Link>
                    </li>
                    <li>
                        <Link className={css.link} onClick={logOut}><BiExit className={css.icon}/>Выйти</Link>
                    </li>
                </ul>
            </nav>
        </React.Fragment>
    );
};

export default NavbarLeft;
