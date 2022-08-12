import React from "react";
import s from 'Main.module.css';
import { HeadBar } from "../HeadBar/HeadBar";
import { logoutAC } from "../../redux/appReducer";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/store";
import { useSelector } from "react-redux";

export const Main = () => {

    const dispatch = useDispatch();

    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);

    const logout = () => {
        dispatch(logoutAC());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
    }


    if (!isAuth) {
        return <Navigate to={"/login"} />;
    } else
    return (
        <div>
            <HeadBar exit={logout}/>
            
        </div>
    )
}