import React, { useEffect } from "react";
import { ReactI18NextChild } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSavedPostsTC, PostType } from "../../../redux/postsReducer";
import { ProfileInfoType } from "../../../redux/profileReducer";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import BlockComponent from "../../common/BlockComponent/BlockComponent";
import { Empty } from "../../common/Empty/Empty";
import Post from "../../common/Post/Post";
import { TabType } from "../Profile";
import s from "./Saved.module.css";

type SavedPropsType = {
    t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
    setCurrentTab: (value: TabType) => void;
    profileData: ProfileInfoType;
};

const Saved = ({ setCurrentTab, t, profileData }: SavedPropsType) => {
    const dispatch = useDispatch<AppDispatchType>();

    const savedPosts = useSelector<AppStateType, Array<PostType>>((state) => state.posts.savedPosts);

    console.log(savedPosts);
    useEffect(() => {
        dispatch(getSavedPostsTC(profileData.user_id));
    }, [dispatch, profileData.user_id]);

    useEffect(() => {
        setCurrentTab("saved");
    }, [setCurrentTab]);

    return (
        <div className={s.saved}>
            <section className={s.right_panel}>
                <BlockComponent title={t("profile.personalInfo")} width={"100%"} margin={"0 10px 0 0"} component={<div>asd asd asd a</div>} />
            </section>
            <section className={s.main_panel}>
                {savedPosts.length > 0 ? (
                    savedPosts.map((el, i) => <Post key={i} width={"calc(100% - 40px)"} postData={el} t={t} />)
                ) : (
                    <Empty t={t} title="profile.savedEmpty" width={"calc(100% - 40px)"} flag="saved"/>
                )}
            </section>
        </div>
    );
};

export default Saved;
