import React, { useState } from "react";
import { ButtonOrange } from "../../../common/ButtonOrange/ButtonOrange";
import arrowRight from "../../../../assets/svg/arrow-right.svg";
import arrowDown from "../../../../assets/svg/arrow-down.svg";
import clip from "../../../../assets/svg/clip.svg";
import emptyProfile from "../../../../assets/empty-profile.png";
import s from "./AddPost.module.css";

const emoji = require("emoji-dictionary");

const AddPost = ({ t, profileData, setTextareaFocus }: any) => {
    const [postText, setPostText] = useState<string>("");
    const [emojiCollapse, setEmojiCollapse] = useState<boolean>(true);

    const avatar = {
        backgroundImage: profileData.photo ? `url(${process.env.REACT_APP_HOST}${profileData.photo})` : `url(${emptyProfile})`,
    };

    return (
        <div>
            <div className={s.type_post}>
                <div className={s.post_author_wrapper}>
                    <div className={s.post_author} style={avatar}></div>
                </div>
                <textarea cols={30} rows={4} value={postText} onChange={(e) => setPostText(e.currentTarget.value)} onFocus={() => setTextareaFocus(true)} />
            </div>
            <div className={s.create_post_controls}>
                <div className={s.emoji_wrapper}>
                    <div className={s.arrow_wrapper} onClick={() => setEmojiCollapse((prev) => !prev)}>
                        <img src={emojiCollapse ? arrowRight : arrowDown} alt="arrow" />
                    </div>
                    <div className={s.emojiBlock} style={emojiCollapse ? { height: "20px" } : { height: "114px" }}>
                        {emoji.unicode.map((m: any) => (
                            <div className={s.emoji} onClick={() => setPostText(postText + m)} key={Math.random()}>
                                {m}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={s.clip}>
                    <img src={clip} alt="clip" width={22} height={22} />
                </div>
                <ButtonOrange width={200} height={40} alignSelf={"self-end"} title={t("posts.publish")} onClick={() => setTextareaFocus(false)} />
            </div>
        </div>
    );
};

export default AddPost;
