import React, { ChangeEvent, Suspense, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { getProfileTC, ProfileInfoType, savePhotoTC } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { Circle } from "../common/Preloaders/Circle/Circle";
import s from "./Profile.module.css";
import cameraIcon from "../../assets/svg/camera-icon.svg";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";

const Posts = React.lazy(() => import("./Posts/Posts"));
const About = React.lazy(() => import("./About/About"));
const Gallery = React.lazy(() => import("./Gallery/Gallery"));

export type TabType = "about" | "posts" | "gallery";

const Profile = () => {
    const { t } = useTranslation();

    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
    const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);
    const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);

    const [currentTab, setCurrentTab] = useState<TabType>();

    const dispatch = useDispatch<AppDispatchType>();

    useEffect(() => {
        dispatch(getProfileTC(user_id));
    }, [dispatch, user_id]);

    const background = {
        backgroundImage: `url(${profileData.background})`,
    };

    const avatar = {
        backgroundImage: `url(${process.env.REACT_APP_HOST}${profileData.photo})`,
    };

    const avaRef = useRef();
    const backRef = useRef();

    const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {

            dispatch(savePhotoTC(e.target.files[0], user_id));
            console.log(e.target.files[0]);
        }
    };

    const onBackSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            //   props.savePhoto(e.target.files[0]);
            console.log(e.target.files[0]);
        }
    };

    if (!isAuth) {
        return <Navigate to="/login" />;
    } else
        return (
            <div className={s.profile_wrapper}>
                <div className={s.profile_top_screen}>
                    <div className={s.top_screen_background} style={background}>
                        {/* @ts-ignore */}
                        <button className={s.change_img_btn} onClick={() => backRef.current.click()}>
                            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 512 512" width={16} height={16} style={{ marginRight: "4px" }}>
                                <g>
                                    <g>
                                        <path
                                            d="M53.333,42.667V416H512V42.667H53.333z M480,384H85.333v-41.373L176,251.961l85.333,85.333l128-128L480,299.961V384z
			 M480,254.706l-90.667-90.667l-128,128L176,206.706l-90.667,90.667V74.667H480V254.706z"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <polygon points="32,437.333 32,112 0,112 0,469.333 442.667,469.333 442.667,437.333 		" />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <path
                                            d="M261.333,106.667c-26.468,0-48,21.533-48,48c0,26.467,21.532,48,48,48s48-21.532,48-48S287.802,106.667,261.333,106.667z
			 M261.333,170.667c-8.822,0-16-7.178-16-16s7.178-16,16-16c8.822,0,16,7.178,16,16S270.156,170.667,261.333,170.667z"
                                        />
                                    </g>
                                </g>
                            </svg>
                            {t("profile.changeImage")}
                        </button>
                        <div className={s.top_screen_avatar_wrapper}>
                            <div className={s.top_screen_avatar} style={avatar}>
                                {/* @ts-ignore */}
                                <div onClick={() => avaRef.current.click()} className={s.download_avatar}>
                                    <img src={cameraIcon} alt="camera icon" width={20} height={20} />{" "}
                                </div>
                            </div>
                        </div>
                        {/* @ts-ignore */}
                        <input type="file" ref={avaRef} style={{ display: "none" }} onChange={onAvatarSelected} accept="image/jpeg,image/png" />
                        {/* @ts-ignore */}
                        <input type="file" ref={backRef} style={{ display: "none" }} onChange={onBackSelected} accept="image/jpeg,image/png" />
                    </div>
                    <div className={s.top_screen_navigate}>
                        <section className={s.top_screen_navigate_name}>
                            <div className={s.navigate_name}>{`${profileData.first_name} ${profileData.last_name}`}</div>
                            <div className={s.navigate_country}>{profileData.country}</div>
                        </section>
                        <section className={s.top_screen_navigate_menu}>
                            <NavLink to="posts" className={currentTab === "posts" ? s.active : undefined}>
                                <div className={s.top_screen_navigate_menu_item}>{t("profile.posts")}</div>
                            </NavLink>
                            <NavLink to="gallery">
                                <div className={s.top_screen_navigate_menu_item}>{t("profile.gallery")}</div>
                            </NavLink>
                            <NavLink to="about" className={currentTab === "about" ? s.active : undefined}>
                                <div className={s.top_screen_navigate_menu_item}>{t("profile.about")}</div>
                            </NavLink>
                        </section>
                        <section>
                            <div className={s.navigate_stats}>
                                <span>{t("profile.posts")}:</span>
                                <span>122</span>
                            </div>
                            <div className={s.navigate_stats}>
                                <span>{t("profile.friends")}:</span>
                                <span>25</span>
                            </div>
                        </section>
                    </div>
                </div>

                <Routes>
                    <Route
                        path="posts"
                        element={
                            <Suspense fallback={<Circle />}>
                                <Posts setCurrentTab={setCurrentTab} t={t} />
                            </Suspense>
                        }
                    />
                    <Route
                        path="gallery"
                        element={
                            <Suspense fallback={<Circle />}>
                                <Gallery setCurrentTab={setCurrentTab} t={t} />
                            </Suspense>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <Suspense fallback={<Circle />}>
                                <About setCurrentTab={setCurrentTab} t={t} profileData={profileData} />
                            </Suspense>
                        }
                    />
                </Routes>
            </div>
        );
};

export default Profile;
