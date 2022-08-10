import React from "react";
import s from './CustomInput.module.css'

export const CustomInput = ({type, width, height, placeholder}:any) => {

    const style = {
        width, height
    }

    return(
        <input className={s.custom_input} type={type} style={style} placeholder={placeholder}/>
    )
}