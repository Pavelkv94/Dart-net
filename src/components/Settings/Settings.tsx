import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editProfileTC, ProfileInfoType } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import BlockComponent from "../common/BlockComponent/BlockComponent";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { Circle } from "../common/Preloaders/Circle/Circle";
import s from "./Settings.module.css";
import { getMeTC, RequestStatus } from "../../redux/appReducer";

type SettingsType = "profile";

type SettingsItemType = {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  placeholder: string;
  type: "input" | "select" | "textarea";
};

const Settings = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatchType>();

  const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);
  const status = useSelector<AppStateType, RequestStatus>((state) => state.profile.profileEditStatus);

  const [tab, setTab] = useState<SettingsType>("profile");
  const [profileInfoData, setProfileInfoData] = useState<ProfileInfoType>(profileData);

  const onSubmit = () => {
    dispatch(
      editProfileTC({
        first_name: profileInfoData.first_name,
        last_name: profileInfoData.last_name,
        gender: profileInfoData.gender,
        birthday: profileInfoData.birthday,
        country: profileInfoData.country,
        education: profileInfoData.education,
        work: profileInfoData.work,
        about: profileInfoData.about,
        facebook: profileInfoData.facebook,
        youtube: profileInfoData.youtube,
        vk: profileInfoData.vk,
        instagram: profileInfoData.instagram,
        linkedin: profileInfoData.linkedin,
        twitter: profileInfoData.twitter,
        telegram: profileInfoData.telegram,
      })
    );
  };

  //   useEffect(() => {
  //     status === "succeeded" && setTimeout(() => dispatch(setProfileEditStatusAC("idle")), 3000);
  //   }, [status, dispatch]);

  useEffect(() => {
    // dispatch(getMeTC());
  }, [dispatch]);

  const error = profileInfoData.first_name.length > 20 || profileInfoData.last_name.length > 20;

  const settingsDataset: SettingsItemType[] = [
    {
      label: t("settings.email"),
      value: profileInfoData.email,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, email: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.email")}`,
      type: "input",
    },
    {
      label: t("settings.firstName"),
      value: profileInfoData.first_name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, first_name: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.firstName")}`,
      type: "input",
    },
    {
      label: t("settings.lastName"),
      value: profileInfoData.last_name,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, last_name: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.lastName")}`,
      type: "input",
    },
    {
      label: t("settings.gender"),
      value: profileInfoData.gender || "",
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setProfileInfoData({ ...profileInfoData, gender: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.gender")}`,
      type: "select",
    },
    {
      label: t("settings.birthday"),
      value: profileInfoData.birthday,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, birthday: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.birthday")}`,
      type: "input",
    },
    {
      label: t("settings.country"),
      value: profileInfoData.country,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, country: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.country")}`,
      type: "input",
    },
    {
      label: t("settings.education"),
      value: profileInfoData.education,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, education: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.education")}`,
      type: "input",
    },
    {
      label: t("settings.work"),
      value: profileInfoData.work,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, work: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.work")}`,
      type: "input",
    },
    {
      label: t("settings.aboutMe"),
      value: profileInfoData.about,
      onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setProfileInfoData({ ...profileInfoData, about: e.currentTarget.value }),
      placeholder: `${t("settings.enter")} ${t("settings.aboutMe")}`,
      type: "textarea",
    },
    {
      label: "Facebook",
      value: profileInfoData.facebook,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, facebook: e.currentTarget.value }),
      placeholder: "https://facebook.com/",
      type: "input",
    },
    {
      label: "Instagram",
      value: profileInfoData.instagram,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, instagram: e.currentTarget.value }),
      placeholder: "https://instagram.com/",
      type: "input",
    },
    {
      label: "LinkedIn",
      value: profileInfoData.linkedin,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, linkedin: e.currentTarget.value }),
      placeholder: "https://www.linkedin.com/",
      type: "input",
    },
    {
      label: "Telegram",
      value: profileInfoData.telegram,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, telegram: e.currentTarget.value }),
      placeholder: "https://t.me/",
      type: "input",
    },
    {
      label: "X",
      value: profileInfoData.twitter,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, twitter: e.currentTarget.value }),
      placeholder: "https://www.x.com/",
      type: "input",
    },
    {
      label: "VK",
      value: profileInfoData.vk,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, vk: e.currentTarget.value }),
      placeholder: "https://vk.com/",
      type: "input",
    },
    {
      label: "Youtube",
      value: profileInfoData.youtube,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setProfileInfoData({ ...profileInfoData, youtube: e.currentTarget.value }),
      placeholder: "https://youtube.com/",
      type: "input",
    },
  ];

  return (
    <div className={s.settings_wrapper}>
      <div className={s.left_panel}>
        <span onClick={() => setTab("profile")} className={tab === "profile" ? s.active : ""}>
          {t("profile.profile")}
        </span>
      </div>
      <BlockComponent
        title={t("profile.settings")}
        width={"100%"}
        margin={"0 0 0 20px"}
        component={
          <div className={s.settings}>
            {settingsDataset.map((item) => (
              <div className={s.setting_item}>
                <label htmlFor="">{item.label}:</label>
                {item.type === "input" && (
                  <input type="text" className={s.text_field} placeholder={item.placeholder} value={item.value} onChange={item.onChange} />
                )}
                {item.type === "select" && (
                  <select className={s.text_field} onChange={item.onChange} defaultValue="Male">
                    <option value="Male">{t("settings.male")}</option>
                    <option value="Female">{t("settings.female")}</option>
                  </select>
                )}
                {item.type === "textarea" && <textarea className={s.text_field} value={item.value} cols={30} rows={10} onChange={item.onChange} />}
              </div>
            ))}

            <div className={s.submit}>
              {status === "loading" ? (
                <Circle />
              ) : (
                <ButtonOrange title={t("settings.confirm")} width={200} height={40} margin={"10px 0 0 0"} onClick={onSubmit} disabled={error} />
              )}
              {status === "succeeded" && <span>{t("settings.success")}</span>}
            </div>
          </div>
        }
      />
    </div>
  );
};

export default Settings;
