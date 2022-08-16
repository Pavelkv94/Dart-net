import React, { useState } from "react";
import s from "./HeadBar.module.css";
import logo_dark from "../../assets/Logo/logo-dark.png";
import home from "../../assets/svg/home.svg";
import friends from "../../assets/svg/friends.svg";
import langIcon from "../../assets/svg/lang.svg";
import messages from "../../assets/svg/messages.svg";
import notify from "../../assets/svg/notify.svg";
import down_arr from "../../assets/svg/down-arr.svg";
import { useTranslation } from "react-i18next";
import { HeadDropdownMenu } from "./HeadDropdownMenu";
import { LangType } from "../Login/Login";

export const HeadBar = React.memo(({ exit }: any) => {
    const { i18n } = useTranslation();
    const [openProfileMenu, setOpenProfileMenu] = useState(false);
    const [lang, setLang] = useState(i18n.language);


    const changeLanguage = (language: LangType) => {
        i18n.changeLanguage(language);
        setLang(language);
    };

    return (
        <header className={s.headBar}>
            <nav>
                <div>
                    <img src={logo_dark} alt="logo" height={40} />
                </div>
                <div className={s.navbar}>
                    <div className={s.navbar_item}>
                        <img src={home} alt="home" width={20} className={s.nav_icon} />
                    </div>
                    <div className={s.navbar_item}>
                        <img src={friends} alt="friends" width={20} className={s.nav_icon} />
                    </div>
                    <div className={s.navbar_item}>
                        <img src={notify} alt="notify" width={20} className={s.nav_icon} />
                    </div>
                    <div className={s.navbar_item}>
                        <img src={messages} alt="messages" width={20} className={s.nav_icon} />
                    </div>
                    <div className={s.navbar_item} onClick={() => lang === 'en' ? changeLanguage('ru') : changeLanguage('en')}>
                        <img src={langIcon} alt="lang" width={20} className={s.nav_icon} />
                        <p className={s.lang_indicator}>{lang}</p>
                    </div>
                    <div className={`${s.navbar_item} ${s.last_navbar_item}`} onClick={() => setOpenProfileMenu((prev) => !prev)}>
                        <div className={s.avatar}></div>
                        <img src={down_arr} alt="down-arrow" width={14} className={s.nav_icon} />
                        {openProfileMenu && <HeadDropdownMenu setOpenProfileMenu={setOpenProfileMenu} exit={exit} openProfileMenu={s} />}
                    </div>
                </div>
            </nav>
        </header>
    );
});
