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
        let user_id = localStorage.getItem("user_id");
        //@ts-ignore
        dispatch(meTC(user_id));
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
