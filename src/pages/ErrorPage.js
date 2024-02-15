import React from 'react';
import {MAIN_ROUTE} from "../consts/routes";
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="error-page">
            <p>404</p>
            <span>Перейти на <Link to={MAIN_ROUTE}>Главную</Link></span>
        </div>
    );
};

export default ErrorPage;
