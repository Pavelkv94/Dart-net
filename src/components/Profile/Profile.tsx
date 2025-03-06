import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getAnotherProfileTC, ProfileInfoType } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Posts = React.lazy(() => import("./Posts/Posts"));
const About = React.lazy(() => import("./About/About"));
const Saved = React.lazy(() => import("./Saved/Saved"));

export type TabType = "about" | "posts" | "saved";

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatchType>();

  const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
  const currentUser = useSelector<AppStateType>((state) => state.app.user);
  //@ts-ignore
  const anotherProfileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.anotherProfileData);

  const [currentTab, setCurrentTab] = useState<TabType>("posts");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    id && dispatch(getAnotherProfileTC(id));
  }, [dispatch, id]);

  if (!isAuth) {
    return <Navigate to="/" />;
  } else
    return (
      <div className={s.profile_wrapper}>
        {/* @ts-ignore */}
        <ProfileInfo t={t} profileData={id ? anotherProfileData : currentUser} currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {/* @ts-ignore */}
        {currentTab === "about" && <About setCurrentTab={setCurrentTab} t={t} profileData={id ? anotherProfileData : currentUser} />}
        {/* @ts-ignore */}
        {currentTab === "posts" && <Posts setCurrentTab={setCurrentTab} t={t} lang={i18n.language} profileData={id ? anotherProfileData : currentUser} />}
        {/* @ts-ignore */}
        {currentTab === "saved" && <Saved setCurrentTab={setCurrentTab} t={t} profileData={id ? anotherProfileData : currentUser} />}
      </div>
    );
};

export default Profile;
