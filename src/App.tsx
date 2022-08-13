import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { meTC } from "./redux/appReducer";
import { AppDispatchType } from "./redux/store";

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
            <Route element={<Login />} path="/login" />
            <Route element={<Main mode={displayMode.profile} />} path="/profile" />
            <Route element={<Main mode={displayMode.messages} />} path="/messages" />
            <Route element={<div>empty</div>} path="*" />
        </Routes>
    );
}

export default App;
