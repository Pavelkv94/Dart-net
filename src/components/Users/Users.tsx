import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatchType, AppStateType } from "../../redux/store";
import { getUsersTC } from "../../redux/usersReducer";
import User from "./User";
import s from "./Users.module.css";

type UsersFilterType = "all" | "friends";

const Users = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch<AppDispatchType>();

    const users = useSelector<AppStateType, any>((state) => state.users.users);
    const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);

    const [usersFilter, setUsersFilter] = useState<UsersFilterType>("all");
    const [usersMode, setUsersMode] = useState<boolean>(false);
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        usersFilter === "all" && setFilteredUsers(users);
        usersFilter === "friends" && setFilteredUsers(users.filter((el: any) => el.friends.find((id:any) => id === user_id) !== undefined));

    }, [usersFilter, users, user_id]);

    useEffect(() => {
        dispatch(getUsersTC());
    }, [dispatch]);

    const allClick = () => {
        setUsersMode(false);
        setUsersFilter('all');
    };

    const friendsClick = () => {
        setUsersMode(true);
        setUsersFilter('friends');
    }

    return (
        <div className={s.users}>
            <div className={s.users_header}>
                <div className={`${s.users_switch} ${!usersMode && s.active}`} onClick={allClick}>
                    {t('users.allUsers')}
                </div>
                <div className={s.users_switch_vr}></div>
                <div className={`${s.users_switch} ${usersMode && s.active}`} onClick={friendsClick}>
                    {t('users.friends')}
                </div>
            </div>

            <div className={s.users_main}>
                {filteredUsers
                    .filter((el: any) => el.user_id !== user_id)
                    .map((el: any) => (
                        <User user={el} user_id={user_id} t={t}/>
                    ))}
            </div>
        </div>
    );
};

export default Users;
