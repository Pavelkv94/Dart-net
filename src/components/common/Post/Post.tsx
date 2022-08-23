import React, { useState } from "react";
import s from "./Post.module.css";
import planet from "../../../assets/svg/about-country.svg";
import comment from "../../../assets/svg/comment.svg";
import { ReactI18NextChild } from "react-i18next";
import { CommentType, likedCommentTC, likedPostTC, PostType, sendCommentTC, unlikedPostTC } from "../../../redux/postsReducer";
import threeDots from "../../../assets/svg/three-dots.svg";
import Comment from "./Comment";
import { ButtonOrange } from "../ButtonOrange/ButtonOrange";
import { ProfileInfoType } from "../../../redux/profileReducer";
import { useSelector } from "react-redux";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import { useDispatch } from "react-redux";

type PostPropsType = {
    t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
    width: number | string;
    postData: PostType;
};

const emoji = require("emoji-dictionary");

const Post = ({ t, width, postData }: PostPropsType) => {
    const dispatch = useDispatch<AppDispatchType>();

    const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);

    const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);

    const style = {
        width,
    };

    const [openComments, setOpenComments] = useState(false);

    const initialComment = {
        user: `${profileData.first_name} ${profileData.last_name}`,
        user_id: user_id,
        userAvatar: `${process.env.REACT_APP_HOST}${profileData.photo}`,
        message: "",
        created_at: "",
        likes: [],
        post_id: postData._id,
    };

    const [commentData, setCommentData] = useState<CommentType>(initialComment);

    const sendComment = () => {
        if (commentData.message.trim() !== "") {
            dispatch(sendCommentTC(commentData));
            setCommentData(initialComment);
        }
    };

    const setPostLike = () => {
        if (!postData.likes.find((el) => el === user_id)) {
            dispatch(likedPostTC({ post_id: postData._id, user_id: user_id }));
        } else {
            dispatch(unlikedPostTC({ post_id: postData._id, user_id: user_id }));
        }
    };

    const avatar = {
        backgroundImage: `url(${process.env.REACT_APP_HOST}${postData.userAvatar})`,
    };

    const image = {
        backgroundImage: `url(${postData.image})`,
        width: "100%",
        height: "400px",
    };

    const colorLike = postData.likes.find((el) => el === user_id) ? "#FF7555" : "#535165"

    const emojiArray = [
        emoji.unicode[0],
        emoji.unicode[2],
        emoji.unicode[5],
        emoji.unicode[45],
        emoji.unicode[35],
        emoji.unicode[55],
        emoji.unicode[42],
        emoji.unicode[116],
        emoji.unicode[117],
        emoji.unicode[34],
        emoji.unicode[51],
        emoji.unicode[52],
        emoji.unicode[31],
        emoji.unicode[58],
    ];

    return (
        <div className={s.post} style={style}>
            <div className={s.post_header}>
                <div className={s.post_avatar} style={avatar}></div>
                <div className={s.post_whois}>
                    <p>{postData.user}</p>
                    <span>
                        <img src={planet} alt="icon" width={14} />
                        <p>{`${t("posts.published")} ${postData.created_at}`}</p>
                    </span>
                </div>
                <div className={s.dots}>
                    <img src={threeDots} alt="three dots" width={30} height={30} />
                </div>
            </div>
            <div className={s.post_main}>
                <div className={s.post_photo} style={postData.image ? image : {}}></div>
                <div className={s.post_description}>
                    <p>{postData.text}</p>
                </div>
            </div>
            <div className={s.post_footer}>
                <div title="Like" className={s.likes} onClick={setPostLike}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" fill={colorLike} viewBox="0 0 544.582 544.582">
                        <g>
                            <path
                                d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                            />
                        </g>
                    </svg>
                    {postData.likes.length}
                </div>
                <div title="Comment" className={s.comments} onClick={() => setOpenComments((prev) => !prev)}>
                    <img src={comment} alt="comment icon" width={30} height={30} />
                    {postData.comments.length}
                </div>
            </div>
            {openComments && (
                <div>
                    <div className={s.add_comment}>
                        <div className={s.comment_author_wrapper}>
                            <div className={s.comment_author} style={avatar}></div>
                        </div>
                        <div className={s.comment_textarea_wrapper}>
                            <textarea
                                className={s.comment_textarea}
                                id=""
                                cols={30}
                                rows={5}
                                placeholder="Post your comment"
                                value={commentData.message}
                                onChange={(e) => setCommentData({ ...commentData, message: e.currentTarget.value })}
                            />
                            <div className={s.add_comment_controls}>
                                <ButtonOrange title={"Send"} width={100} height={30} onClick={sendComment} />
                                <div className={s.emoji_block}>
                                    {emojiArray.map((m: any, i: number) => (
                                        <div className={s.emoji} onClick={() => setCommentData({ ...commentData, message: commentData.message + m })} key={i}>
                                            {m}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {postData.comments.map((el, i) => (
                        <Comment key={i} comment={el} user_id={user_id}/>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Post;
