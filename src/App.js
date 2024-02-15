import './App.css';
import React, {useContext, useEffect, useState} from "react";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userApi";
import NavbarTop from "./components/navBar/navbarTop/NavbarTop";
import {fetchCategories} from "./http/categoryApi";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = observer(() => {
    const {user} = useContext(Context);
    const {category} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check().then(data => {
            user.setUser(data);
            user.setIsAuth(true);

            fetchCategories().then(categories => {
                category.setCategories(categories);
            })
        }).catch((e) => {
            //navigate(LOGIN_ROUTE, { replace: false });
        }).finally(() => setLoading(false))
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <BrowserRouter>
            {user.isAuth && <NavbarTop />}

            <AppRouter />

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </BrowserRouter>
    );
});

export default App;
