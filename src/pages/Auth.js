import React, {useContext, useState} from 'react';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE} from "../consts/routes";
import {login, registration} from "../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useInput} from "../hooks/useInput";
import {fetchCategories} from "../http/categoryApi";
import {toast} from "react-toastify";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const {category} = useContext(Context);

    const location = useLocation();
    const isRegistration = location.pathname === REGISTRATION_ROUTE;
    const navigate = useNavigate();

    const email = useInput('', {isEmpty: true, isEmail: true});
    const password = useInput('', {isEmpty: true});

    const firstName = useInput('', {isEmpty: true});
    const lastName = useInput('', {isEmpty: true});
    const emailReg = useInput('', {isEmpty: true, isEmail: true});
    const passwordReg = useInput('', {isEmpty: true, minLength: 3});

    const click = async (e) => {
        e.preventDefault();
        try {
            let data;
            if (isRegistration) {
                data = await registration(emailReg.value, passwordReg.value, firstName.value, lastName.value);
            } else {
                data = await login(email.value, password.value);
            }
            user.setUser(data);
            user.setIsAuth(true);
            navigate(MAIN_ROUTE, { replace: false });

            fetchCategories().then(data => {
                category.setCategories(data);
            })
        } catch (e) {
            toast.warn(e.response.data.message);
        }
    }

    return (
        <div className="auth">
            <img className="logo" src="./images/logo.png" alt="logo" />
            <h2>{isRegistration ? "Регистрация" : "Авторизация"}</h2>
            <form onSubmit={click} className="auth-form">
                {isRegistration ?
                    <React.Fragment>
                        <input className="inp margin-ver-6" placeholder="Имя" type="text"
                               value={firstName.value} onChange={e => firstName.onChange(e)}
                               onBlur={e => firstName.onBlur(e)} />
                        {(firstName.isDirty && firstName.isEmpty.err) && <div className="inp-error">{firstName.isEmpty.text}</div>}

                        <input className="inp margin-ver-6" placeholder="Фамилия" type="text"
                               value={lastName.value} onChange={e => lastName.onChange(e)}
                               onBlur={e => lastName.onBlur(e)} />
                        {(lastName.isDirty && lastName.isEmpty.err) && <div className="inp-error">{lastName.isEmpty.text}</div>}

                        <input className="inp margin-ver-6" placeholder="Email" type="text"
                               value={emailReg.value} onChange={e => emailReg.onChange(e)}
                               onBlur={e => emailReg.onBlur(e)} />
                        {(emailReg.isDirty && emailReg.isEmpty.err) && <div className="inp-error">{emailReg.isEmpty.text}</div>}
                        {(emailReg.isDirty && emailReg.emailError.err) && <div className="inp-error">{emailReg.emailError.text}</div>}

                        <input className="inp margin-ver-6" placeholder="Пароль" type="password"
                               value={passwordReg.value} onChange={e => passwordReg.onChange(e)}
                               onBlur={e => passwordReg.onBlur(e)} />
                        {(passwordReg.isDirty && passwordReg.isEmpty.err) && <div className="inp-error">{passwordReg.isEmpty.text}</div>}
                        {(passwordReg.isDirty && passwordReg.minLengthError.err) && <div className="inp-error">{passwordReg.minLengthError.text}</div>}

                        <p>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></p>

                        <button disabled={firstName.inputErr || lastName.inputErr || emailReg.inputErr || passwordReg.inputErr}
                                className="btn btn-inv" onClick={click}>Зарегистрироваться</button>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <input className="inp margin-ver-6" placeholder="Email" type="text"
                               value={email.value} onChange={e => email.onChange(e)}
                               onBlur={e => email.onBlur(e)}/>
                        {(email.isDirty && email.isEmpty.err) && <div className="inp-error">{email.isEmpty.text}</div>}
                        {(email.isDirty && email.emailError.err) && <div className="inp-error">{email.emailError.text}</div>}

                        <input className="inp margin-ver-6" placeholder="Пароль" type="password"
                               value={password.value} onChange={e => password.onChange(e)}
                               onBlur={e => password.onBlur(e)}/>
                        {(password.isDirty && password.isEmpty.err) && <div className="inp-error">{password.isEmpty.text}</div>}

                        <p>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink></p>

                        <button disabled={email.inputErr || password.inputErr}
                                className="btn btn-inv" onClick={click}>Войти
                        </button>
                    </React.Fragment>
                }
            </form>
        </div>
    );
});

export default Auth;
