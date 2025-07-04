import { ChangeEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { ProfileInfoType, saveBackgroundTC, savePhotoTC } from "../../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import cameraIcon from "../../../assets/svg/camera-icon.svg";
import s from "./ProfileInfo.module.css";
import emptyProfile from "../../../assets/empty-profile.png";
//@ts-ignore
import { ReactI18NextChild } from "react-i18next";
import { TabType } from "../Profile";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMediaSource } from "../../../utils/getMediaSource";

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

  const background = {
    backgroundImage: `url(${getMediaSource(profileData.background)})`,
  };

  const avatar = {
    backgroundImage: profileData.photo ? `url(${getMediaSource(profileData.photo)})` : `url(${emptyProfile})`,
  };

  const avaRef = useRef<HTMLInputElement>(null);
  const backgroundRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(savePhotoTC(e.target.files[0], id || profileData.id));
    }
  };
  const handleBackgroundChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      dispatch(saveBackgroundTC(e.target.files[0], id || profileData.id));
    }
  };

  return (
    <div className={s.profile_top_screen}>
      <div className={s.top_screen_background} style={background}>
        {!id && (
          <>
            <input type="file" ref={backgroundRef} style={{ display: "none" }} onChange={handleBackgroundChange} accept="image/jpeg,image/png" />
            <button className={s.change_img_btn} onClick={() => backgroundRef.current?.click()}>
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
          </>
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
        <input type="file" ref={avaRef} style={{ display: "none" }} onChange={handleAvatarChange} accept="image/jpeg,image/png" />
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
