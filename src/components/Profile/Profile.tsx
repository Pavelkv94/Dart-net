import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { getProfileTC, ProfileInfoType } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { Circle } from "../common/Preloaders/Circle/Circle";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Posts = React.lazy(() => import("./Posts/Posts"));
const About = React.lazy(() => import("./About/About"));
const Saved = React.lazy(() => import("./Saved/Saved"));

export type TabType = "about" | "posts" | "saved";

const Profile = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatchType>();

    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
    const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);
    const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);
    
    const [currentTab, setCurrentTab] = useState<TabType>("about");

    useEffect(() => {
        id ? dispatch(getProfileTC(id)) : dispatch(getProfileTC(user_id));
    }, [dispatch, id, user_id]);

    if (!isAuth) {
        return <Navigate to="/login" />;
    } else
        return (
            <div className={s.profile_wrapper}>
                <ProfileInfo t={t} profileData={profileData} user_id={user_id} currentTab={currentTab} setCurrentTab={setCurrentTab} />

                {currentTab === "about" && <About setCurrentTab={setCurrentTab} t={t} profileData={profileData} />}
                {currentTab === "posts" && <Posts setCurrentTab={setCurrentTab} t={t} profileData={profileData} />}
                {currentTab === "saved" && <Saved setCurrentTab={setCurrentTab} t={t} profileData={profileData} />}
            </div>
        );
};

export default Profile;
