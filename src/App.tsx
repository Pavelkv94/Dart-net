import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Main } from "./components/Main/Main";
import { meTC } from "./redux/appReducer";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        let username = localStorage.getItem("user");
        //@ts-ignore
        dispatch(meTC(username));
    }, [dispatch]);

    return (
        <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Main />} path="/" />
            <Route element={<div>empty</div>} path="*" />
        </Routes>
    );
}

export default App;
