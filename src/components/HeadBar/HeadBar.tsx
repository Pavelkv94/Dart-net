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
import { NavLink } from "react-router-dom";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import emptyProfile from "../../assets/empty-profile.png";
import { getNewsTC } from "../../redux/outDataReducer";

export const HeadBar = React.memo(({ exit }: { exit: () => void }) => {
  const dispatch = useDispatch<AppDispatchType>();

  const { t, i18n } = useTranslation();
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [lang, setLang] = useState(i18n.language);

  // const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);
  const photo = useSelector<AppStateType, string | undefined>((state) => state.app.user?.photo);

  const changeLanguage = (language: LangType) => {
    i18n.changeLanguage(language);
    setLang(language);
    dispatch(getNewsTC(language));
  };

  // useEffect(() => {
  //     dispatch(getPhotoTC(user_id));
  // }, [dispatch]);

  const avatar = {
    backgroundImage: photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${photo})` : `url(${emptyProfile})`,
  };

  return (
    <header className={s.headBar}>
      <nav>
        <div>
          <img src={logo_dark} alt="logo" height={40} />
        </div>
        <div className={s.navbar}>
          <div className={s.navbar_item}>
            <NavLink to="/home">
              <img src={home} alt="home" width={20} className={s.nav_icon} />
            </NavLink>
          </div>
          <div className={s.navbar_item}>
            <NavLink to="/users">
              <img src={friends} alt="friends" width={20} className={s.nav_icon} />
            </NavLink>
          </div>
          <div className={s.navbar_item}>
            <img src={notify} alt="notify" width={20} className={s.nav_icon} />
          </div>
          <div className={s.navbar_item}>
            <NavLink to="/messages">
              <img src={messages} alt="messages" width={20} className={s.nav_icon} />
            </NavLink>
          </div>
          <div className={s.navbar_item} onClick={() => (lang === "en" ? changeLanguage("ru") : changeLanguage("en"))}>
            <img src={langIcon} alt="lang" width={20} className={s.nav_icon} />
            <p className={s.lang_indicator}>{lang}</p>
          </div>
          <div className={`${s.navbar_item} ${s.last_navbar_item}`} onClick={() => setOpenProfileMenu((prev) => !prev)}>
            <div className={s.avatar} style={avatar}></div>
            <img src={down_arr} alt="down-arrow" width={14} className={s.nav_icon} />
            {openProfileMenu && <HeadDropdownMenu setOpenProfileMenu={setOpenProfileMenu} exit={exit} t={t} />}
          </div>
        </div>
      </nav>
    </header>
  );
});
