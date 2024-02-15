import React, {useContext} from 'react';
import {Routes, Route, Link, Navigate, Redirect} from "react-router-dom";
import Main from "./pages/Main";
import {
    ERROR_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    REGISTRATION_ROUTE,
    REPORT_GROUP_ROUTE,
    REPORT_ONE_ROUTE,
    SETTING_ROUTE
} from "./consts/routes";
import Setting from "./pages/Setting";
import Budget from "./pages/Budget";
import BudgetGroup from "./pages/BudgetGroup";
import Auth from "./pages/Auth";
import {Context} from "./index";
import ErrorPage from "./pages/ErrorPage";

const AppRouter = () => {
    const {user} = useContext(Context);

    return (
        <Routes>
            <Route path={'/'} element={user.isAuth ? <Main /> : <Auth />} />

            <Route path={MAIN_ROUTE} element={user.isAuth ? <Main /> : <Navigate to={LOGIN_ROUTE} />} />
            <Route path={SETTING_ROUTE} element={user.isAuth ? <Setting /> : <Navigate to={LOGIN_ROUTE} />} />
            <Route path={REPORT_ONE_ROUTE} element={user.isAuth ? <Budget /> : <Navigate to={LOGIN_ROUTE} />} />
            <Route path={REPORT_GROUP_ROUTE} element={user.isAuth ? <BudgetGroup /> : <Navigate to={LOGIN_ROUTE} />} />

            <Route path={LOGIN_ROUTE} element={<Auth />} />
            <Route path={REGISTRATION_ROUTE} element={<Auth />} />

            <Route path='*' element={<ErrorPage />} />
        </Routes>
    );
};

export default AppRouter;
