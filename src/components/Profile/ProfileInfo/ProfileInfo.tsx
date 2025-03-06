import React, { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { editProfileTC, ProfileInfoType, savePhotoTC } from "../../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import cameraIcon from "../../../assets/svg/camera-icon.svg";
import ok from "../../../assets/svg/ok.svg";
import s from "./ProfileInfo.module.css";
import emptyProfile from "../../../assets/empty-profile.png";
//@ts-ignore
import { ReactI18NextChild } from "react-i18next";
import { TabType } from "../Profile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

type ProfileInfoPropsType = {
  t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
  profileData: ProfileInfoType;
  currentTab: TabType;
  setCurrentTab: (value: TabType) => void;
};
const ProfileInfo = ({ t, profileData, currentTab, setCurrentTab }: ProfileInfoPropsType) => {
  const dispatch = useDispatch<AppDispatchType>();

  const { id } = useParams();

  const postsCount = useSelector<AppStateType, number>((state) => state.posts.userPosts.totalCount);
  // const authorizedUserId = useSelector<AppStateType, string>((state) => state.app.user.id);

  const [openBackUrl, setOpenBackUrl] = useState<boolean>(false);
  const [backUrl, setBackUrl] = useState<string>("");

  const background = {
    backgroundImage: `url(${profileData.background})`,
  };

  const avatar = {
    backgroundImage: profileData.photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${profileData.photo})` : `url(${emptyProfile})`,
  };

  const avaRef = useRef<HTMLInputElement>(null);

  const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      dispatch(savePhotoTC(e.target.files[0]));
    }
  };
  const changeBackground = () => {
    if (backUrl.trim() !== "") {
      dispatch(editProfileTC({ background: backUrl }));
    }
    setBackUrl("");
    setOpenBackUrl(false);
  };

  const onKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      changeBackground();
    }
  };

  return (
    <div className={s.profile_top_screen}>
      <div className={s.top_screen_background} style={background}>
        {openBackUrl && (
          <div className={s.enter_back_url}>
            <input
              type="text"
              autoFocus
              placeholder={t("profile.enterUrl")}
              value={backUrl}
              onChange={(e) => setBackUrl(e.currentTarget.value)}
              onKeyDown={onKeyHandler}
            />
            <button onClick={changeBackground}>
              <img src={ok} alt="ok" width={14} />
            </button>
          </div>
        )}
        {!id && (
          <button className={s.change_img_btn} onClick={() => setOpenBackUrl((prev) => !prev)}>
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              width={16}
              height={16}
              style={{ marginRight: "4px" }}
            >
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
        )}
        <div className={s.top_screen_avatar_wrapper}>
          <div className={s.top_screen_avatar} style={avatar}>
            {!id && (
              <div onClick={() => avaRef.current?.click()} className={s.download_avatar}>
                <img src={cameraIcon} alt="camera icon" width={20} height={20} />{" "}
              </div>
            )}
          </div>
        </div>
        <input type="file" ref={avaRef} style={{ display: "none" }} onChange={onAvatarSelected} accept="image/jpeg,image/png" />
      </div>
      <div className={s.top_screen_navigate}>
        <section className={s.top_screen_navigate_name}>
          <div className={s.navigate_name}>{`${profileData.first_name} ${profileData.last_name}`}</div>
          <div className={s.navigate_country}>{profileData.country}</div>
        </section>
        <section className={s.top_screen_navigate_menu}>
          <div className={`${s.top_screen_navigate_menu_item} ${currentTab === "posts" ? s.active : undefined}`} onClick={() => setCurrentTab("posts")}>
            {t("profile.posts")}
          </div>

          {!id && (
            <div className={`${s.top_screen_navigate_menu_item} ${currentTab === "saved" ? s.active : undefined}`} onClick={() => setCurrentTab("saved")}>
              {t("profile.saved")}
            </div>
          )}
          <div className={`${s.top_screen_navigate_menu_item} ${currentTab === "about" ? s.active : undefined}`} onClick={() => setCurrentTab("about")}>
            {t("profile.about")}
          </div>
        </section>
        <section>
          <div className={s.navigate_stats}>
            <span>{t("profile.posts")}:</span>
            <span>{postsCount}</span>
          </div>
          <div className={s.navigate_stats}>
            <span>{t("profile.friends")}:</span>
            <span>{0}</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileInfo;
