import React, { Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Circle } from "./components/common/Preloaders/Circle/Circle";
import { meTC } from "./redux/appReducer";
import { AppDispatchType } from "./redux/store";

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
    };

    return (
        <Routes>
            <Route element={<Suspense fallback={<Circle />}><Login /></Suspense>} path="/login" />
            <Route element={<Main mode={displayMode.profile} />} path="/profile/*" />
            <Route element={<Main mode={displayMode.messages} />} path="/messages" />
            <Route element={<div>empty</div>} path="*" />
        </Routes>
    );
}

export default App;
