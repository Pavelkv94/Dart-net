import React from "react";
import s from "./Post.module.css";
import planet from "../../../assets/svg/about-country.svg";
import comment from "../../../assets/svg/comment.svg";
import { ReactI18NextChild } from "react-i18next";
import { PostType } from "../../../redux/postsReducer";

type PostPropsType = {
    t: (value: string) => ReactI18NextChild| Iterable<ReactI18NextChild>;
    width: number | string
    postData: PostType
};

const Post = ({ t, width, postData }: PostPropsType) => {
    const style = {
        width,
    };

    const avatar = {
        backgroundImage: `url(${postData.userAvatar})`
    };

    return (
        <div className={s.post} style={style}>
            <div className={s.post_header}>
                <div className={s.post_avatar} style={avatar}></div>
                <div className={s.post_whois}>
                    <p>{postData.user}</p>
                    <span>
                        <img src={planet} alt="icon" width={14} />
                        <p>Published: January,5 2010 19:PM</p>
                    </span>
                </div>
            </div>
            <div className={s.post_main}>
                <div className={s.post_photo}>
                    {postData.image && <img src={postData.image} alt="post screen" />}
                </div>
                <div className={s.post_description}>
                    <p>{postData.text}</p>
                </div>
            </div>
            <div className={s.post_footer}>

                <div title="Like" className={s.likes}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" fill="#535165" viewBox="0 0 544.582 544.582">
                        <g>
                            <path
                                d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                            />
                        </g>
                    </svg>
                    {postData.likes}
                </div>
                <div title="Comment" className={s.comments}>
                    <img src={comment} alt="comment icon" width={30} height={30}/>
                    {postData.comments.length}
                </div>
                
                
            </div>
        </div>
    );
};

export default Post;
