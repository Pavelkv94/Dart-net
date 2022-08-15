import React, { useEffect } from "react";
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
import { ReactI18NextChild } from "react-i18next";
import { TabType } from "../Profile";
import { ProfileInfoType } from "../../../redux/profileReducer";

type PersonalInfoItemType = {
    icon: string;
    title: ReactI18NextChild | Iterable<ReactI18NextChild> | null;
    description: string;
};

type PersonalInfoType = Array<PersonalInfoItemType>;

type AboutType = {
    setCurrentTab: (value: TabType) => void
    t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
     profileData: ProfileInfoType
};

const About = ({ setCurrentTab, t, profileData }: AboutType) => {
    useEffect(() => {
        setCurrentTab("about");
    }, [setCurrentTab]);

    const personalInfo: PersonalInfoType = [
        { icon: profile, title: t("profile.aboutMe"), description: profileData.about },
        { icon: birthday, title: t("profile.birthday"), description: profileData.birthday },
        { icon: gender, title: t("profile.gender"), description: "Male" },
        { icon: country, title: t("profile.country"), description: profileData.country },
        { icon: join, title: t("profile.joined"), description: "01/01/01" },
        { icon: email, title: t("profile.emailWeb"), description: profileData.email },
        // {icon: profile, title: t('profile.aboutMe'), description: profileData.about},
    ];
    const infoItems = personalInfo.map((e, i) => (
        <div key={i} className={s.personal_info_item}>
            <div>
                <img src={e.icon} alt="info icon" width={12} />
                <h6>{e.title}</h6>
            </div>
            <p>{e.description}</p>
        </div>
    ));

    return (
        <div className={s.about}>
            <BlockComponent title={t('profile.personalInfo')} width={"33%"} margin={'0 10px 0 0'} component={<div>{infoItems}</div>} />
            <BlockComponent title={t('profile.generalInfo')} width={"66%"} margin={'0 0 0 10px'} component={<div>{infoItems}</div>} />
        </div>
    );
};

export default About;
