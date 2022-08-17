import React, { useEffect, useState } from "react";
import BlockComponent from "../../common/BlockComponent/BlockComponent";
import Weather from "../../common/Weather/Weather";
import s from "./Posts.module.css";
import AddPost from "./AddPost/AddPost";
import Post from "../../common/Post/Post";

const Posts = ({ setCurrentTab, t, profileData }: any) => {
    const [textareaFocus, setTextareaFocus] = useState<boolean>(false);

    useEffect(() => {
        setCurrentTab("posts");
    }, [setCurrentTab]);

    return (
        <div className={s.posts}>
            <section className={s.right_panel}>
                <BlockComponent title={t("profile.personalInfo")} width={"100%"} margin={"0 10px 0 0"} component={<div>asd asd asd a</div>} />
                <Weather />
            </section>
            <section className={s.main_panel}>
                {textareaFocus && <div className={s.focused_back} onClick={() => setTextareaFocus(false)}></div>}
                <BlockComponent
                    title={t("posts.createPost")}
                    width={"calc(100% - 40px)"}
                    margin={"0 0 0 0"}
                    position={"relative"}
                    component={<AddPost t={t} profileData={profileData} setTextareaFocus={setTextareaFocus} />}
                />

                <Post  width={"calc(100% - 40px)"} />
            </section>
        </div>
    );
};

export default Posts;
