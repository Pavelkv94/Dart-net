import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getProfileTC, ProfileInfoType } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import s from "./Profile.module.css";

const Profile = () => {
    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
    const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);
    const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);

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
                        <section></section>
                        <section>
                            <div className={s.navigate_stats}>
                                <span>Posts:</span>
                                <span>122</span>
                            </div>
                            <div className={s.navigate_stats}>
                                <span>Friends:</span>
                                <span>25</span>
                            </div>
                        </section>
                    </div>
                </div>
               
            </div>
        );
};

export default Profile;
