import React, { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { getAnotherProfileTC, getProfileTC, ProfileInfoType } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { Circle } from "../common/Preloaders/Circle/Circle";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { getMeTC } from "../../redux/appReducer";

const Posts = React.lazy(() => import("./Posts/Posts"));
const About = React.lazy(() => import("./About/About"));
const Saved = React.lazy(() => import("./Saved/Saved"));

export type TabType = "about" | "posts" | "saved";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatchType>();

  const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
  const currentUser = useSelector<AppStateType, UserType>((state) => state.app.user);

  // const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);
  const anotherProfileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.anotherProfileData);

  const [currentTab, setCurrentTab] = useState<TabType>("posts");

  useEffect(() => {
    id ? dispatch(getAnotherProfileTC(id)) : dispatch(getMeTC());
  }, [dispatch, id]);

  if (!isAuth) {
    return <Navigate to="/" />;
  } else
    return (
      <div className={s.profile_wrapper}>
        <ProfileInfo t={t} profileData={id ? anotherProfileData : currentUser} currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {currentTab === "about" && <About setCurrentTab={setCurrentTab} t={t} profileData={id ? anotherProfileData : currentUser} />}
        {currentTab === "posts" && <Posts setCurrentTab={setCurrentTab} t={t} lang={i18n.language} profileData={id ? anotherProfileData : currentUser} />}
        {currentTab === "saved" && <Saved setCurrentTab={setCurrentTab} t={t} profileData={id ? anotherProfileData : currentUser} />}
      </div>
    );
};

export default Profile;
