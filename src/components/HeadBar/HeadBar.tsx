import React from "react";
import s from "./HeadBar.module.css";
import logo_dark from "../../assets/Logo/logo-dark.png";
import home from "../../assets/svg/home.svg";
import friends from "../../assets/svg/friends.svg";
import lang from "../../assets/svg/lang.svg";
import messages from "../../assets/svg/messages.svg";
import notify from "../../assets/svg/notify.svg";
import down_arr from "../../assets/svg/down-arr.svg";
import { useTranslation } from "react-i18next";
import { HeadDropdownMenu } from "./HeadDropdownMenu";

export const HeadBar = ({ exit }: any) => {
    const { i18n } = useTranslation();

    return (
        <header className={s.headBar}>
            <nav>
                <div>
                    <img src={logo_dark} alt="logo" height={40}/>
                </div>
                <div className={s.navbar}>
                    <div className={s.navbar_item}>
                        <img src={home} alt="home" width={20} className={s.nav_icon}/>
                    </div>
                    <div className={s.navbar_item}>
                        <img src={friends} alt="friends" width={20} className={s.nav_icon}/>
                    </div>
                    <div className={s.navbar_item}>
                        <img src={notify} alt="notify" width={20} className={s.nav_icon}/>
                    </div>
                    <div className={s.navbar_item}>
                        <img src={messages} alt="messages" width={20} className={s.nav_icon}/>
                    </div>
                    <div className={s.navbar_item}>
                        <img src={lang} alt="lang" width={20} className={s.nav_icon}/>
                        <p className={s.lang_indicator}>{i18n.language}</p>
                    </div>
                    <div className={`${s.navbar_item} ${s.last_navbar_item}`}>
                        <div className={s.avatar}></div>
                        <img src={down_arr} alt="down-arrow" width={14} className={s.nav_icon}/>
                        <HeadDropdownMenu />
                    </div>
                    <button onClick={exit}>+++</button>
                </div>
            </nav>
        </header>
    );
};
