import React, { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginTC, setAppErrAC, setAppStatusAC } from "../../redux/appReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { CustomInput } from "../common/CustomInput/CustomInput";
import { LoginPropsType } from "./Login";
import s from "./Login.module.css";

type InitialLoginData = {
    email: string;
    password: string;
};

export const LoginNow = ({ t, setLoginMode }: LoginPropsType) => {
    const dispatch = useDispatch<AppDispatchType>();

    const initialData = {
        email: "",
        password: "",
    };
    const [loginData, setLoginData] = useState<InitialLoginData>(initialData);
    const [time, setTime] = useState({ hour: "24", minutes: "1" });

    const error = useSelector<AppStateType, string | null>((state) => state.app.error);

    console.log(time);
    const handleClick = () => {
        //@ts-ignore
        dispatch(loginTC({ ...loginData, time: `${time.hour * 3600 + time.minutes * 60 > 0 ? time.hour * 3600 + time.minutes * 60 : "1"}` }));
    };

    const changeMode = () => {
        dispatch(setAppStatusAC("idle"));
        dispatch(setAppErrAC(""));
        setLoginMode(false);
    };

    return (
        <section>
            <div className={s.login_form_header}>
                <h1>{t("login.welcome")}</h1>
                <p>{t("login.welcomeBack")}</p>
            </div>
            <div className={s.credentials}>
                <b>{t("login.email")}:</b> test8@example.com <b>{t("login.password")}:</b> test
            </div>
            <div className={s.time}>
                <section>{t("login.limit")}:</section>
                <section>
                    <label htmlFor="">{t("login.hours")}:</label>
                    <input
                        title="0-24h"
                        type="number"
                        value={time.hour}
                        max={24}
                        min={0}
                        onChange={(e) => {
                            setTime({ ...time, hour: e.currentTarget.value });
                        }}
                    />
                    <label htmlFor="">{t("login.minutes")}:</label>
                    <input
                        title="0-60m"
                        type="number"
                        value={time.minutes}
                        max={60}
                        min={1}
                        onChange={(e) => {
                            setTime({ ...time, minutes: e.currentTarget.value });
                        }}
                    />
                </section>
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
