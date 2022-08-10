import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";

function App() {
    return (
        <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Profile />} path="/" />
            <Route element={<div>empty</div>} path="*" />
        </Routes>
    );
}

export default App;
