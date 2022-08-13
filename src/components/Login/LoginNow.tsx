import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginTC, setAppErrAC, setAppStatusAC } from "../../redux/appReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { CustomInput } from "../common/CustomInput/CustomInput";
import s from "./Login.module.css";

type InitialLoginData = {
    email: string;
    password: string;
};

export const LoginNow = ({ t, setLoginMode }: any) => {
    const dispatch = useDispatch<AppDispatchType>();

    const initialData = {
        email: "",
        password: "",
    };
    const [loginData, setLoginData] = useState<InitialLoginData>(initialData);

    const error = useSelector<AppStateType, string | null>((state) => state.app.error);

    const handleClick = () => {
        dispatch(loginTC(loginData));
    };

    const changeMode = () => {
        dispatch(setAppStatusAC("idle"));
        dispatch(setAppErrAC(''));
        setLoginMode(false)
    }

    return (
        <section>
            <div className={s.login_form_header}>
                <h1>{t("login.welcome")}</h1>
                <p>{t("login.welcomeBack")}</p>
            </div>

            <div className={s.credentials}>
                <b>{t("login.email")}:</b> test@example.com <b>{t("login.password")}:</b> demo
            </div>
            <div>
                <CustomInput
                    type={"email"}
                    width={310}
                    placeholder={t("login.email")}
                    value={loginData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, email: e.currentTarget.value })}
                />
                <br />
                <CustomInput
                    type={"password"}
                    width={310}
                    placeholder={t("login.password")}
                    value={loginData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginData({ ...loginData, password: e.currentTarget.value })}
                />
                <br />

                <ButtonOrange title={t("login.loginNow")} width={350} onClick={handleClick} />
                {error && <p className={s.error}>{error}</p>}
            </div>
            <p className={s.register}>
                {t("login.dontHaveAcc")} <span onClick={changeMode}>{t("login.registerNow")}</span>
            </p>
        </section>
    );
};
