import React from "react";
import { useDispatch } from "react-redux";
import { CommentType, likedCommentTC } from "../../../redux/postsReducer";
import { AppDispatchType } from "../../../redux/store";
import s from "./Post.module.css";

type CommentPropsType = {
    comment: CommentType;
    user_id: string
};

const Comment = ({ comment,user_id }: CommentPropsType) => {

    const dispatch = useDispatch<AppDispatchType>();
console.log(comment)
    const setCommentLike = () => {
        if (!comment.likes.find((el) => el === user_id)) {
            dispatch(likedCommentTC({ comment_id: comment.comment_id, post_id: comment.post_id, user_id: user_id }));
        } else {
            //unliked
        }
    };

    const avatar = {
        backgroundImage: `url(${comment.userAvatar})`,
    };

    return (
        <div className={s.comment_wrapper}>
            <div className={s.comment_author_wrapper }>
                <div className={s.comment_author} style={avatar}></div>
            </div>

            <div className={s.comment_main}>
              
                <p>
                    <b>{comment.user}</b>
                    {comment.message}
                </p>
                <div className={s.comment_controls}><p>{comment.created_at}</p>
                <div title="Like" className={s.likes_comment} onClick={setCommentLike}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30px" height="30px" fill="#535165" viewBox="0 0 544.582 544.582">
                        <g>
                            <path
                                d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                            />
                        </g>
                    </svg>
                    {comment.likes}
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default Comment;
