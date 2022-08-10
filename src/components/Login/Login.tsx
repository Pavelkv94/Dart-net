import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { CustomInput } from "../common/CustomInput/CustomInput";
import s from "./Login.module.css";
import logo from "../../assets/Logo/logo.png";

type LangType = "ru" | "en";

export const Login = () => {
    const { t, i18n } = useTranslation();

    const [lang, setLang] = useState(i18n.language);

    const changeLanguage = (language: LangType) => {
        i18n.changeLanguage(language);
        setLang(language);
    };

    return (
        <div className={s.login_wrapper}>
            <div className={s.login}>
                <div className={s.login_form}>
                    <div className={s.login_form_block}>
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

                        <div className={s.login_form_header}>
                            <h1>{t("login.welcome")}</h1>
                            <p>{t("login.welcomeBack")}</p>
                        </div>

                        <div className={s.credentials}>
                            <b>{t("login.username")}:</b> user <b>{t("login.password")}:</b> demo
                        </div>
                        <div>
                            <CustomInput type={"text"} width={310} placeholder={t("login.username")} />
                            <br />
                            <CustomInput type={"password"} width={310} placeholder={t("login.password")} />
                            <br />
                            <ButtonOrange title={t("login.loginNow")} width={350} />
                        </div>
                        <p className={s.register}>
                            {t("login.dontHaveAcc")} <span>{t("login.registerNow")}</span>
                        </p>
                    </div>
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
