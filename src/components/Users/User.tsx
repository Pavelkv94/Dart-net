import s from "./Users.module.css";
import emptyProfile from "../../assets/empty-profile.png";
import { NavLink } from "react-router-dom";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { useDispatch } from "react-redux";
import { AppDispatchType } from "../../redux/store";
import { ContactActionType, setContactActionTC } from "../../redux/usersReducer";
import { ProfileInfoType } from "../../redux/profileReducer";
import { TFunction } from "i18next";

const User = ({ user, t }: { user: ProfileInfoType; t: TFunction }) => {
  const dispatch = useDispatch<AppDispatchType>();

  const background = {
    backgroundImage: `url(${user.background})`,
  };

  const avatar = {
    backgroundImage: user.photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${user.photo})` : `url(${emptyProfile})`,
  };

  const follow = () => {
    dispatch(setContactActionTC({ targetUserId: user.id, action: ContactActionType.FOLLOW }));
  };

  const unfollow = () => {
    dispatch(setContactActionTC({ targetUserId: user.id, action: ContactActionType.UNFOLLOW }));
  };

  return (
    <div className={s.user}>
      <div className={s.user_back} style={background}>
        <div className={s.user_avatar} style={avatar}></div>
      </div>
      <div className={s.user_name}>
        <NavLink to={`/${user.id}`}>
          <span>{user.first_name + " " + user.last_name}</span>
        </NavLink>
        <span className={s.user_name_country}>{user.country}</span>
      </div>
      <div className={s.user_info}></div>
      <div className={s.user_footer}>
        {user.isFriend ? (
          <ButtonOrange title={t("users.unfollow")} width={100} height={30} onClick={unfollow} backgroundColor="gray" />
        ) : (
          <ButtonOrange title={t("users.follow")} width={100} height={30} onClick={follow} />
        )}

        <NavLink to="/messages">
          <ButtonOrange title={t("users.message")} width={100} height={30} />
        </NavLink>
      </div>
    </div>
  );
};

export default User;
