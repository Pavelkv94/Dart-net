import React, { useEffect, useState } from "react";
import BlockComponent from "../../common/BlockComponent/BlockComponent";
import Weather from "../../common/Weather/Weather";
import s from "./Posts.module.css";
import AddPost from "./AddPost/AddPost";
import Post from "../../common/Post/Post";
import { getPostsTC, PostType } from "../../../redux/postsReducer";
import { useDispatch } from "react-redux";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import { ReactI18NextChild } from "react-i18next";
import { TabType } from "../Profile";
import { ProfileInfoType } from "../../../redux/profileReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Empty } from "../../common/Empty/Empty";
import { NewsBlock } from "../../common/NewsBlock/NewsBlock";
import { getNewsTC } from "../../../redux/outDataReducer";

type PostsPropsType = {
    t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
    setCurrentTab: (value: TabType) => void;
    profileData: ProfileInfoType;
    lang: string
};

const Posts = ({ setCurrentTab, t, lang, profileData }: PostsPropsType) => {
    const { id } = useParams();

    const dispatch = useDispatch<AppDispatchType>();

    const posts = useSelector<AppStateType, Array<PostType>>((state) => state.posts.posts);

    const [textareaFocus, setTextareaFocus] = useState<boolean>(false);

    const news = useSelector<AppStateType, any>((state) => state.outData.news);
    
    useEffect(() => {
        news.length < 1 && dispatch(getNewsTC(lang));
    }, [news, dispatch, lang]);

    useEffect(() => {
        setCurrentTab("posts");
    }, [setCurrentTab]);

    useEffect(() => {
        dispatch(getPostsTC(profileData.user_id));
    }, [dispatch, profileData.user_id]);

    return (
        <div className={s.posts}>
            <section className={s.right_panel}>
                <Weather t={t} />
                <NewsBlock t={t} news={news} width={"100%"} margin={"0 0 0 0"} />
            </section>
            <section className={s.main_panel}>
                {textareaFocus && <div className={s.focused_back} onClick={() => setTextareaFocus(false)}></div>}
                {!id && (
                    <BlockComponent
                        title={t("posts.createPost")}
                        width={"calc(100% - 40px)"}
                        margin={"0 0 20px 0"}
                        position={"relative"}
                        component={<AddPost t={t} profileData={profileData} setTextareaFocus={setTextareaFocus} />}
                    />
                )}

                {posts.length > 0 ? (
                    posts.map((el, i) => <Post key={i} width={"calc(100% - 40px)"} postData={el} t={t} place={id ? "userPosts" : "myPosts"}/>)
                ) : (
                    <Empty t={t} title="profile.postsEmpty" width={"calc(100% - 40px)"} flag="post" />
                )}
            </section>
        </div>
    );
};

export default Posts;
