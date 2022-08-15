import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registrationTC, RequestStatusType, setAppErrAC, setAppStatusAC } from "../../redux/appReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { CustomInput } from "../common/CustomInput/CustomInput";
import { Circle } from "../common/Preloaders/Circle/Circle";
import { LoginPropsType } from "./Login";
import s from "./Login.module.css";

type InitialRegisterData = {
    email: string;
    password: string;
};

export const Registration = ({ t, setLoginMode }: LoginPropsType) => {
    const dispatch = useDispatch<AppDispatchType>();

    const initialData = {
        email: "",
        password: "",
    };
    const [regData, setRegData] = useState<InitialRegisterData>(initialData);

    const error = useSelector<AppStateType, string | null>((state) => state.app.error);
    const status = useSelector<AppStateType, RequestStatusType>((state) => state.app.status);

    const handleClick = () => {
        dispatch(registrationTC(regData));
    };

    const changeMode = () => {
        dispatch(setAppStatusAC("idle"));
        dispatch(setAppErrAC(""));
        setLoginMode(true);
    };

    const disabled = regData.email === "" || regData.password === "";

    useEffect(() => {
        status === "succeeded" &&
            setTimeout(() => {
                setLoginMode(true);
            }, 3000);
    }, [status]);
    
    return (
        <section>
            <div className={s.reg_form_header}>
                <h1>{t("login.reg")}</h1>
            </div>

            <div>
                <CustomInput
                    type={"email"}
                    width={310}
                    placeholder={t("login.email")}
                    value={regData.email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRegData({ ...regData, email: e.currentTarget.value })}
                />
                <br />
                <CustomInput
                    type={"password"}
                    width={310}
                    placeholder={t("login.password")}
                    value={regData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setRegData({ ...regData, password: e.currentTarget.value })}
                />
                <p className={s.reg_descript}>{t("login.regDescript")}</p>
                <br />
                {status === "loading" ? (
                    <div className={s.preloader}>
                        <Circle />
                    </div>
                ) : (
                    <ButtonOrange title={t("login.regNow")} width={350} onClick={handleClick} disabled={disabled} />
                )}
                {error && <p className={s.error}>{error}</p>}
                {status === "succeeded" && <p className={s.succeeded}>{t("login.regSuccess")}</p>}
            </div>
            <p className={s.register}>
                {t("login.haveAcc")} <span onClick={changeMode}>{t("login.loginNow")}</span>
            </p>
        </section>
    );
};
