import React from "react";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { CustomInput } from "../common/CustomInput/CustomInput";
import s from "./Login.module.css";

export const Login = () => {
    console.log(process.env);
    return (
        <div className={s.login_wrapper}>
            <div className={s.login}>
                <div className={s.login_form}>
                    <div className={s.fake_logo}>Logo</div>
                    <h1>Welcome</h1>
                    <CustomInput type={'text'} width={200}/>
                    <br />
                    <ButtonOrange title={'login'}/>
                </div>
                <div className={s.login_picture}></div>
            </div>
            {/* <input type="text" />
            <input type="text" />
            <button>+</button> */}
        </div>
    );
};
