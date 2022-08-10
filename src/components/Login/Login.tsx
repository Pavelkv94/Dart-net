import React from "react";
import s from './Login.module.css';

export const Login = () => {
    console.log(process.env)
    return (<div className={s.red}>
        <input type="text" />
        <input type="text" />
        <button>+</button>

    </div>)
}