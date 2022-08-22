import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/store";
import s from "./Messages.module.css";

const Messages = () => {
    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);

    if (!isAuth) {
        return <Navigate to="/login" />;
    } else return <div className={s.blue}>Messsages</div>;
};

export default Messages;