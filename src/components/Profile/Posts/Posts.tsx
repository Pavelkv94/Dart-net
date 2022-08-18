import React, { useEffect, useState } from "react";
import BlockComponent from "../../common/BlockComponent/BlockComponent";
import Weather from "../../common/Weather/Weather";
import s from "./Posts.module.css";
import AddPost from "./AddPost/AddPost";
import Post from "../../common/Post/Post";
import { getMyPostsTC, PostType } from "../../../redux/postsReducer";
import { useDispatch } from "react-redux";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import { ReactI18NextChild } from "react-i18next";
import { TabType } from "../Profile";
import { ProfileInfoType } from "../../../redux/profileReducer";
import { useSelector } from "react-redux";

type PostsPropsType = {
    t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
    setCurrentTab: (value: TabType) => void;
    profileData: ProfileInfoType;
};

const Posts = ({ setCurrentTab, t, profileData }: PostsPropsType) => {
    const dispatch = useDispatch<AppDispatchType>();

    const myPosts = useSelector<AppStateType, Array<PostType>>((state) => state.posts.myPosts);

    console.log(myPosts);

    const [textareaFocus, setTextareaFocus] = useState<boolean>(false);

    useEffect(() => {
        setCurrentTab("posts");
    }, [setCurrentTab]);

    useEffect(() => {
        dispatch(getMyPostsTC());
    }, [dispatch]);

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

                {myPosts.map((el, i) => (
                    <Post key={i} width={"calc(100% - 40px)"} postData={el} t={t}/>
                ))}

            </section>
        </div>
    );
};

export default Posts;
