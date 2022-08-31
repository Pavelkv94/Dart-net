import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Circle } from "./components/common/Preloaders/Circle/Circle";
import { meTC } from "./redux/appReducer";
import { AppDispatchType } from "./redux/store";

//@ts-ignore
const Login = React.lazy(() => import("./components/Login/Login"));
const Main = React.lazy(() => import("./components/Main/Main"));

function App() {
    const dispatch = useDispatch<AppDispatchType>();

    useEffect(() => {
        let user_id = localStorage.getItem("user_id");
        dispatch(meTC(user_id));
    }, [dispatch]);

    const displayMode = {
        profile: "profile",
        messages: "messages",
        users: "users",
        home: "home",
        settings: "settings"
    };

    return (
        <Routes>
            <Route element={<Suspense fallback={<Circle />}><Login /></Suspense>} path="/login" />
            <Route element={<Main mode={displayMode.profile} />} path="/" >
               <Route element={<Main mode={displayMode.profile} />} path=":id" />
            </Route>
            <Route element={<Main mode={displayMode.messages} />} path="/messages" />
            <Route element={<Main mode={displayMode.users} />} path="/users" />
            <Route element={<Main mode={displayMode.home} />} path="/home" />
            <Route element={<Main mode={displayMode.settings} />} path="/settings" />
            <Route element={<div>empty</div>} path="*" />
        </Routes>
    );
}

export default App;
