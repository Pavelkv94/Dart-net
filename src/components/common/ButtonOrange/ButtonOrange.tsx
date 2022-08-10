import React from "react";
import s from './ButtonOrange.module.css'

export const ButtonOrange = ({title, width, height}:any) => {

    const style = {
        width, height
    }

    return(
        <button className={s.button_orange} style={style}>{title}</button>
    )
}