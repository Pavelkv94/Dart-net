import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { getProfileTC, ProfileInfoType } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { Circle } from "../common/Preloaders/Circle/Circle";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Posts = React.lazy(() => import("./Posts/Posts"));
const About = React.lazy(() => import("./About/About"));
const Gallery = React.lazy(() => import("./Gallery/Gallery"));

export type TabType = "about" | "posts" | "gallery";

const Profile = () => {
    const { t } = useTranslation();

    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
    const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);
    const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);

    const [currentTab, setCurrentTab] = useState<TabType>('about');

    const dispatch = useDispatch<AppDispatchType>();

    useEffect(() => {
        dispatch(getProfileTC(user_id));
    }, [dispatch, user_id]);

    if (!isAuth) {
        return <Navigate to="/login" />;
    } else
        return (
            <div className={s.profile_wrapper}>
                <ProfileInfo t={t} profileData={profileData} user_id={user_id} currentTab={currentTab} setCurrentTab={setCurrentTab}/>

{currentTab === "about" && <About setCurrentTab={setCurrentTab} t={t} profileData={profileData} />}
{currentTab === "posts" &&  <Posts setCurrentTab={setCurrentTab} t={t} profileData={profileData}/>}
                {/* <Routes>
                    <Route
                        path="posts"
                        element={
                            <Suspense fallback={<Circle />}>
                                <Posts setCurrentTab={setCurrentTab} t={t} profileData={profileData}/>
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
                </Routes> */}
            </div>
        );
};

export default Profile;
