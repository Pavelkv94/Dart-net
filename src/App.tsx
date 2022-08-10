import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";

function App() {
    const { t, i18n } = useTranslation();

    // const changeLanguage = (language:any) => {
    //     i18n.changeLanguage(language);
    //   };

    return (
        <Routes>
            <Route element={<Login />} path="/login" />
            <Route element={<Profile />} path="/" />
            <Route element={<div>empty</div>} path="*" />
        </Routes>
    );
}

export default App;
