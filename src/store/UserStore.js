import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    get isAuth() {
        return this._isAuth;
    }

    setUser(user) {
        this._user = user;
    }
    get user() {
        return this._user;
    }

    setFirstName(value) {
        this._user.first_name = value;
    }

    setLastName(value) {
        this._user.last_name = value;
    }

    get asJson() {
        return {
            id: this._user.id,
            firstName: this._user.first_name,
            lastName: this._user.last_name,
        }
    }
}
