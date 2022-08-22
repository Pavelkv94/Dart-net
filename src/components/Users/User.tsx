import React from "react";
import s from "./Users.module.css";
import emptyProfile from "../../assets/empty-profile.png";
import { NavLink } from "react-router-dom";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { useDispatch } from "react-redux";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { followTC, unfollowTC } from "../../redux/usersReducer";
import { useSelector } from "react-redux";

const User = ({ user, user_id, t }: any) => {

    const dispatch = useDispatch<AppDispatchType>();

    const background = {
        backgroundImage: `url(${user.background})`,
    };

    const avatar = {
        backgroundImage: user.photo ? `url(${process.env.REACT_APP_HOST}${user.photo})` : `url(${emptyProfile})`,
    };

    const follow = () => {
        dispatch(followTC({ userFrom: user_id, userTo: user.user_id }));
    };

    const unfollow = () => {
        dispatch(unfollowTC({ userFrom: user_id, userTo: user.user_id }));
    };

    return (
        <div className={s.user}>
            <div className={s.user_back} style={background}>
                <div className={s.user_avatar} style={avatar}></div>
            </div>
            <div className={s.user_name}>
                <NavLink to={`/profile/${user.user_id}`}>
                    <span>{user.name}</span>
                </NavLink>
                <span className={s.user_name_country}>{user.country}</span>
            </div>
            <div className={s.user_info}></div>
            <div className={s.user_footer}>
                {user.friends.find((el: string) => el === user_id) !== undefined ? (
                    <ButtonOrange title={"UnFollow"} width={100} height={30} onClick={unfollow} backgroundColor="gray"/>
                ) : (
                    <ButtonOrange title={"Follow"} width={100} height={30} onClick={follow} />
                )}

                <ButtonOrange title={"Message"} width={100} height={30} disabled={true} />
            </div>
        </div>
    );
};

export default User;
