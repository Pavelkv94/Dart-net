import React, { useState } from "react";
import { ReactI18NextChild, useTranslation } from "react-i18next";
import s from "./Login.module.css";
import logo from "../../assets/Logo/logo.png";
import { LoginNow } from "./LoginNow";
import { Registration } from "./Registration";
import { useSelector } from "react-redux";
import { AppStateType } from "../../redux/store";
import { RequestStatusType } from "../../redux/appReducer";
import { Navigate } from "react-router-dom";

export type LangType = "ru" | "en";

export type LoginPropsType = {
    t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
    setLoginMode: (value: boolean) => void;
};

const Login = () => {
    const { t, i18n } = useTranslation();

    const [lang, setLang] = useState(i18n.language);
    const [loginMode, setLoginMode] = useState(true);

    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
    const status = useSelector<AppStateType, RequestStatusType>((state) => state.app.status);

    const changeLanguage = (language: LangType) => {
        i18n.changeLanguage(language);
        setLang(language);
    };

    if (isAuth && status === "succeeded") {
        return <Navigate to={"/profile"} />;
    } else
        return (
            <div className={s.login_wrapper}>
                <div className={s.login}>
                    <div className={s.login_form}>
                        <div className={s.login_form_logo_header}>
                            <div className={s.logo}>
                                <img src={logo} alt="logo" width={100} />
                                <p>art</p>
                            </div>
                            <div className={s.lang}>
                                <div className={lang === "en" ? s.active_lang : ""} onClick={() => changeLanguage("en")}>
                                    En
                                </div>
                                <div className={lang === "ru" ? s.active_lang : ""} onClick={() => changeLanguage("ru")}>
                                    Рус
                                </div>
                            </div>
                        </div>
                        <div className={s.login_form_block}>{loginMode ? <LoginNow t={t} setLoginMode={setLoginMode} /> : <Registration t={t} setLoginMode={setLoginMode} />}</div>
                    </div>
                    <div className={s.login_picture}>
                        <div className={s.login_picture_descript}>
                            <h2>{t("login.getExperience")}</h2>
                            <p>{t("login.discover")}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Login;
