import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editProfileTC, ProfileInfoType, RequestStatusType, setProfileEditStatusAC } from "../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import BlockComponent from "../common/BlockComponent/BlockComponent";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { Circle } from "../common/Preloaders/Circle/Circle";
import s from "./Settings.module.css";

type SettingsType = "profile";

const Settings = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatchType>();

    const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);
    const status = useSelector<AppStateType, RequestStatusType>((state) => state.profile.profileEditStatus);

    const [tab, setTab] = useState<SettingsType>("profile");
    const [profileInfoData, setProfileInfoData] = useState<ProfileInfoType>(profileData);

    console.log(profileInfoData);

    const onSubmit = () => {
        dispatch(editProfileTC(profileInfoData));
    };

    useEffect(() => {
        status === "succeeded" && setTimeout(() => dispatch(setProfileEditStatusAC("idle")), 3000);
    }, [status, dispatch]);
    
    const error = profileInfoData.first_name.length > 20 || profileInfoData.last_name.length > 20;

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
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.firstName")}</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder={t("settings.firstName")}
                                value={profileInfoData.first_name}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, first_name: e.currentTarget.value })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.lastName")}</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder={t("settings.lastName")}
                                value={profileInfoData.last_name}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, last_name: e.currentTarget.value })}
                            />
                        </div>
                        {error && <span className={s.error}>{t("settings.error")}</span>}
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.gender")}</label>
                            <select className={s.text_field} onChange={(e) => setProfileInfoData({ ...profileInfoData, gender: e.target.value })} defaultValue="Male">
                                <option value="Male">{t("settings.male")}</option>
                                <option value="Female">{t("settings.female")}</option>
                            </select>
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.birthday")}</label>
                            <input
                                type="date"
                                className={s.text_field}
                                value={profileInfoData.birthday}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, birthday: e.currentTarget.value })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.country")}y</label>
                            <input type="text" className={s.text_field} placeholder={t("settings.countruPlaceholder")} value={profileInfoData.country} />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.education")}</label>
                            <input
                                type="text"
                                className={s.text_field}
                                value={profileInfoData.education}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, education: e.currentTarget.value })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.work")}</label>
                            <input type="text" className={s.text_field} value={profileInfoData.work} onChange={(e) => setProfileInfoData({ ...profileInfoData, work: e.currentTarget.value })} />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">{t("settings.aboutMe")}</label>
                            <textarea
                                className={s.text_field}
                                cols={30}
                                rows={10}
                                value={profileInfoData.about}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, about: e.currentTarget.value })}
                            />
                        </div>
                        <div className={s.border}></div>
                        <div className={s.setting_item}>
                            <label htmlFor="">Facebook:</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder="https://facebook.com/"
                                value={profileInfoData.contacts.facebook}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, contacts: { ...profileInfoData.contacts, facebook: e.currentTarget.value } })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">Instagram:</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder="https://instagram.com/"
                                value={profileInfoData.contacts.instagram}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, contacts: { ...profileInfoData.contacts, instagram: e.currentTarget.value } })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">LinkedIn:</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder="https://www.linkedin.com/"
                                value={profileInfoData.contacts.linkedin}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, contacts: { ...profileInfoData.contacts, linkedin: e.currentTarget.value } })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">Telegram:</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder="https://t.me/"
                                value={profileInfoData.contacts.telegram}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, contacts: { ...profileInfoData.contacts, telegram: e.currentTarget.value } })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">Twitter:</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder="https://www.twitter.com/"
                                value={profileInfoData.contacts.twitter}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, contacts: { ...profileInfoData.contacts, twitter: e.currentTarget.value } })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">VK:</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder="https://vk.com"
                                value={profileInfoData.contacts.vk}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, contacts: { ...profileInfoData.contacts, vk: e.currentTarget.value } })}
                            />
                        </div>
                        <div className={s.setting_item}>
                            <label htmlFor="">Youtube:</label>
                            <input
                                type="text"
                                className={s.text_field}
                                placeholder="https://youtube.com/"
                                value={profileInfoData.contacts.youtube}
                                onChange={(e) => setProfileInfoData({ ...profileInfoData, contacts: { ...profileInfoData.contacts, youtube: e.currentTarget.value } })}
                            />
                        </div>
                        <div className={s.submit}>
                            {status === "loading" ? <Circle /> : <ButtonOrange title={t("settings.confirm")} width={200} height={40} margin={"10px 0 0 0"} onClick={onSubmit} disabled={error} />}
                            {status === "succeeded" && <span>{t("settings.success")}</span>}
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default Settings;
