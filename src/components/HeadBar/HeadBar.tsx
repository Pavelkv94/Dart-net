import React from "react";
import s from './HeadBar.module.css';
import logo_dark from "../../assets/Logo/logo-dark.png";

export const HeadBar = () => {

    return (
        <header className={s.headBar}>
            <nav>
                <div>
                    <img src={logo_dark} alt="logo" height={40}/>
                </div>
                <div className={s.navbar}>
                    <div className={s.navbar_item}>Home</div>
                    <div className={s.navbar_item}>Friends</div>
                    <div className={s.navbar_item}>Notification</div>
                    <div className={s.navbar_item}>messages</div>
                    <div className={s.navbar_item}>language</div>
                    <div className={s.navbar_item}>profle</div>
                </div>
            </nav>
        </header>
    )
}