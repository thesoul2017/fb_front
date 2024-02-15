import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserStore from "./store/UserStore";
import CategoryStore from "./store/CategoryStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        category: new CategoryStore()
    }}>
        {/*<React.StrictMode>*/}
            <App/>
        {/*</React.StrictMode>*/}
    </Context.Provider>
);
