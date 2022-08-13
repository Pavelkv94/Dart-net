import React, { Suspense } from "react";
import s from "./Main.module.css";
import { HeadBar } from "../HeadBar/HeadBar";
import { logoutAC } from "../../redux/appReducer";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { useSelector } from "react-redux";
import { Profile } from "../Profile/Profile";
import { Messages } from "../Messages/Messages";
import { Circle } from "../common/Preloaders/Circle/Circle";

export const Main = ({mode}: any) => {
    const dispatch = useDispatch<AppDispatchType>();

    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);

    const logout = () => {
        dispatch(logoutAC());
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("role");
    };

    const currentWindow = (mode:any) => {
        switch (mode) {
            case "profile":
                return <Suspense fallback={<Circle/>}><Profile /></Suspense>;;
            case "messages":
                return <Suspense fallback={<Circle/>}><Messages /></Suspense>;;

            default:
                return <Suspense fallback={<Circle/>}><Profile /></Suspense>;;
        }
    };

    if (!isAuth) {
        return <Navigate to={"/login"} />;
    } else
        return (
            <div className={s.main}>
                <HeadBar exit={logout} />
                {currentWindow(mode)}
            </div>
        );
};
