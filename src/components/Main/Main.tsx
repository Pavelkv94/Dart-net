import React, { Suspense } from "react";
import s from "./Main.module.css";
import { HeadBar } from "../HeadBar/HeadBar";
import { logoutTC } from "../../redux/appReducer";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { useSelector } from "react-redux";
import { Circle } from "../common/Preloaders/Circle/Circle";
import logo from "../../assets/Logo/logo.png";
import Home from "../Home/Home";
import { displayMode } from "../../redux/AppContants";

const Profile = React.lazy(() => import("../Profile/Profile"));
const Messages = React.lazy(() => import("../Messages/Messages"));
const Users = React.lazy(() => import("../Users/Users"));
const Settings = React.lazy(() => import("../Settings/Settings"));

const Main = ({ mode }: { mode: displayMode }) => {
  const dispatch = useDispatch<AppDispatchType>();
  const navigate = useNavigate();

  const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);

  const logout = () => {
    dispatch(logoutTC());
    localStorage.removeItem("token");
    navigate("/");
  };

  const currentWindow = (mode: displayMode) => {
    switch (mode) {
      case displayMode.profile:
        return (
          <Suspense fallback={<Circle />}>
            <Profile />
          </Suspense>
        );
      case displayMode.messages:
        return (
          <Suspense fallback={<Circle />}>
            <Messages />
          </Suspense>
        );
      case displayMode.users:
        return (
          <Suspense fallback={<Circle />}>
            <Users />
          </Suspense>
        );
      case displayMode.home:
        return (
          <Suspense fallback={<Circle />}>
            <Home />
          </Suspense>
        );
      case displayMode.settings:
        return (
          <Suspense fallback={<Circle />}>
            <Settings />
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<Circle />}>
            <Profile />
          </Suspense>
        );
    }
  };

  if (!isAuth) {
    return <Navigate to={"/"} />;
  } else
    return (
      <div className={s.main}>
        <HeadBar exit={logout} />
        <div className={s.content}>{currentWindow(mode)}</div>
        <div className={s.footer_wrapper}>
          <div className={s.footer}>
            <div className={s.footer_item}>
              <img src={logo} alt="logo" height={30} />
              <p>&#169; {new Date().getFullYear()} Dart by Pavel Kazlou. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Main;
