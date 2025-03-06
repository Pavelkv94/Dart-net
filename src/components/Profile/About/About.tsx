import { useEffect } from "react";
import BlockComponent from "../../common/BlockComponent/BlockComponent";
import s from "./About.module.css";
import birthday from "../../../assets/svg/about-birthday.svg";
import country from "../../../assets/svg/about-country.svg";
import education from "../../../assets/svg/about-education.svg";
import email from "../../../assets/svg/about-email.svg";
import gender from "../../../assets/svg/about-gender.svg";
import join from "../../../assets/svg/about-join.svg";
import profile from "../../../assets/svg/about-profile.svg";
import work from "../../../assets/svg/about-work.svg";
import settingIcon from "../../../assets/svg/setting.svg";
import facebook from "../../../assets/svg/about-facebook.svg";
import youtube from "../../../assets/svg/about-youtube.svg";
import vk from "../../../assets/svg/about-vk.svg";
import instagram from "../../../assets/svg/about-instagram.svg";
import linkedin from "../../../assets/svg/about-linkedin.svg";
import twitter from "../../../assets/svg/about-twitter.svg";
import telegram from "../../../assets/svg/about-telegram.svg";
//@ts-ignore
import { ReactI18NextChild } from "react-i18next";
import { TabType } from "../Profile";
import { ProfileInfoType } from "../../../redux/profileReducer";
import { NavLink } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";

type PersonalInfoItemType = {
  icon: string;
  title: ReactI18NextChild | Iterable<ReactI18NextChild> | null;
  description: string;
};

type PersonalInfoType = Array<PersonalInfoItemType>;

type AboutType = {
  setCurrentTab: (value: TabType) => void;
  t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
  profileData: ProfileInfoType;
};

const About = ({ setCurrentTab, t, profileData }: AboutType) => {
  useEffect(() => {
    setCurrentTab("about");
  }, [setCurrentTab]);

  const personalInfo: PersonalInfoType = [
    { icon: birthday, title: t("profile.birthday"), description: profileData.birthday },
    { icon: gender, title: t("profile.gender"), description: "Male" },
    { icon: country, title: t("profile.country"), description: profileData.country },
    { icon: join, title: t("profile.joined"), description: formatDate(profileData.createdAt) },
    { icon: email, title: t("profile.emailWeb"), description: profileData.email },
    { icon: profile, title: t("profile.aboutMe"), description: profileData.about },
  ];

  const generalInfo: PersonalInfoType = [
    { icon: profile, title: t("profile.aboutMe"), description: profileData.about },
    { icon: education, title: t("profile.education"), description: profileData.education },
    { icon: work, title: t("profile.work"), description: profileData.work },
  ];

  const socialNetworks = [
    { icon: facebook, link: profileData.facebook },
    { icon: youtube, link: profileData.youtube },
    { icon: vk, link: profileData.vk },
    { icon: instagram, link: profileData.instagram },
    { icon: linkedin, link: profileData.linkedin },
    { icon: twitter, link: profileData.twitter },
    { icon: telegram, link: profileData.telegram },
  ];

  const personalInfoItems = personalInfo.map((e, i) => (
    <div key={i} className={s.personal_info_item}>
      <div>
        <img src={e.icon} alt="info icon" width={12} />
        <h6>{e.title}</h6>
      </div>
      <p>{e.description}</p>
    </div>
  ));

  const generalInfoItems = generalInfo.map((e, i) => (
    <div key={i} className={s.personal_info_item}>
      <div>
        <img src={e.icon} alt="info icon" width={12} />
        <h6>{e.title}</h6>
      </div>
      <p>{e.description}</p>
    </div>
  ));

  const socialNetworksItems = socialNetworks.map((e, i) => (
    <a href={e.link} key={i} target="blank">
      <div className={s.social_link}>
        <img src={e.icon} alt="socialicon" width={20} />
      </div>
    </a>
  ));

  return (
    <div className={s.about}>
      <BlockComponent title={t("profile.personalInfo")} width={"33%"} margin={"0 10px 0 0"} component={<div>{personalInfoItems}</div>} />
      <BlockComponent
        title={t("profile.generalInfo")}
        width={"66%"}
        margin={"0 0 0 10px"}
        component={
          <div>
            <div className={s.flex}>
              <div>{generalInfoItems}</div>
              <NavLink to="/settings" className={s.edit_profile_wrapper}>
                {" "}
                <div className={s.edit_profile}>
                  <img src={settingIcon} alt="settings icon" width={50} />
                  <p>{t("profile.editProfile")}</p>
                </div>
              </NavLink>
            </div>
            <section className={s.social_networks}>
              <span>{t("profile.socialNetworks")}</span>
              <div className={s.social_networks_items}>{socialNetworksItems}</div>
            </section>
          </div>
        }
      />
    </div>
  );
};

export default About;
