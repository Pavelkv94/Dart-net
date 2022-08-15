import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import { getProfileTC, ProfileInfoType } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { Circle } from "../common/Preloaders/Circle/Circle";
import s from "./Profile.module.css";

const Posts = React.lazy(() => import("./Posts/Posts"));
const About = React.lazy(() => import("./About/About"));
const Gallery = React.lazy(() => import("./Gallery/Gallery"));

type TabType = "about" | "posts" | "gallery";

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
        backgroundImage: `url(${profileData.photo})`,
    };

    if (!isAuth) {
        return <Navigate to="/login" />;
    } else
        return (
            <div className={s.profile_wrapper}>
                <div className={s.profile_top_screen}>
                    <div className={s.top_screen_background} style={background}>
                        <div className={s.top_screen_avatar_wrapper}>
                            <div className={s.top_screen_avatar} style={avatar}></div>
                        </div>
                    </div>
                    <div className={s.top_screen_navigate}>
                        <section className={s.top_screen_navigate_name}>
                            <div className={s.navigate_name}>{`${profileData.first_name} ${profileData.last_name}`}</div>
                            <div className={s.navigate_country}>{profileData.country}</div>
                        </section>
                        <section className={s.top_screen_navigate_menu}>
                            <NavLink to="posts" className={currentTab === 'posts' ? s.active : undefined}>
                                <div className={s.top_screen_navigate_menu_item}>{t('profile.posts')}</div>
                            </NavLink>
                            <NavLink to="gallery">
                                <div className={s.top_screen_navigate_menu_item}>{t('profile.gallery')}</div>
                            </NavLink>
                            <NavLink to="about" className={currentTab === 'about' ? s.active : undefined}>
                                <div className={s.top_screen_navigate_menu_item}>{t('profile.aboutMe')}</div>
                            </NavLink>
                        </section>
                        <section>
                            <div className={s.navigate_stats}>
                                <span>{t('profile.posts')}:</span>
                                <span>122</span>
                            </div>
                            <div className={s.navigate_stats}>
                                <span>{t('profile.friends')}:</span>
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
                                <Posts setCurrentTab={setCurrentTab} t={t}/>
                            </Suspense>
                        }
                    />
                    <Route
                        path="gallery"
                        element={
                            <Suspense fallback={<Circle />}>
                                <Gallery setCurrentTab={setCurrentTab} t={t}/>
                            </Suspense>
                        }
                    />
                    <Route
                        path="about"
                        element={
                            <Suspense fallback={<Circle />}>
                                <About setCurrentTab={setCurrentTab} t={t}/>
                            </Suspense>
                        }
                    />
                </Routes>
            </div>
        );
};

export default Profile;
