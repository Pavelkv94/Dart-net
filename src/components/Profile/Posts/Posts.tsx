import React, { useEffect } from "react";
import BlockComponent from "../../common/BlockComponent/BlockComponent";
import Weather from "../../common/Weather/Weather";
import s from "./Posts.module.css";
import emptyProfile from "../../../assets/empty-profile.png";
import { ButtonOrange } from "../../common/ButtonOrange/ButtonOrange";

const Posts = ({ setCurrentTab, t, profileData }: any) => {

    useEffect(() => {
        setCurrentTab("posts");
    }, [setCurrentTab]);

    const avatar = {
        backgroundImage: profileData.photo ? `url(${process.env.REACT_APP_HOST}${profileData.photo})` : `url(${emptyProfile})`,
    };

    return (
        <div className={s.posts}>
            <section className={s.right_panel}>
                <BlockComponent title={t("profile.personalInfo")} width={"100%"} margin={"0 10px 0 0"} component={<div>asd asd asd a</div>} />
                <Weather />
            </section>
            <section className={s.main_panel}>
                <BlockComponent title={t("posts.createPost")} width={"calc(100% - 40px)"} margin={"0 0 0 0"} component={<div>
                    <div className={s.type_post}>
                        <div className={s.post_author_wrapper}><div className={s.post_author} style={avatar}></div></div>
                        <textarea cols={30} rows={4}></textarea>
                    </div>
                    <div className={s.create_post_controls}><ButtonOrange width={200} height={40} title={t('posts.publish')}/></div>
                </div>} />
            </section>
        </div>
    );
};

export default Posts;
