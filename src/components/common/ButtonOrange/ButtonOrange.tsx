import React from "react";
import s from './ButtonOrange.module.css'

export const ButtonOrange = ({title, width, height, onClick, disabled = false}:any) => {

    const style = {
        width, height
    }

    return(
        <button className={`${s.button_orange} ${disabled ? s.disabled : {}}`} style={style} onClick={onClick} disabled={disabled}>{title}</button>
    )
}