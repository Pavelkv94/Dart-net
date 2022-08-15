import React, { useEffect } from "react";
import BlockComponent from "../../common/BlockComponent/BlockComponent";
import s from "./About.module.css";

type PersonalInfoItemType = {
    icon: string
     title: string
      description: string
}

type PersonalInfoType = Array<PersonalInfoItemType>;

const About = ({setCurrentTab, t}:any) => {

    useEffect(() => {
        setCurrentTab('about')
    }, [setCurrentTab]);

    const personalInfo:PersonalInfoType = [
        {icon: '', title: t('profile.aboutMe'), description: ''}
    ]
    // const infoItem = 


    return (
        <div>
            <BlockComponent title={"Personal info"} width={"33%"} component={
            <div>asdasdadsadass sssssss</div>
            } />
        </div>
    );
};

export default About;
