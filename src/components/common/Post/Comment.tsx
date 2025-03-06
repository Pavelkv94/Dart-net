import { useDispatch } from "react-redux";
import { CommentType, LikeParentType, likePostOrCommentTC, PlaceType } from "../../../redux/postsReducer";
import { AppDispatchType } from "../../../redux/store";
import s from "./Post.module.css";
import { formatDate } from "../../../utils/formatDate";

type CommentPropsType = {
  comment: CommentType;
  user_id: string | undefined;
  place: PlaceType;
};

const Comment = ({ comment, user_id, place }: CommentPropsType) => {
  const dispatch = useDispatch<AppDispatchType>();

  const setCommentLike = () => {
    dispatch(likePostOrCommentTC({ parent_id: comment.id, parent_type: LikeParentType.Comment }, place, user_id));
  };

  const avatar = {
    backgroundImage: `url(${import.meta.env.VITE_REACT_APP_HOST}${comment.user.photo})`,
  };
  const colorLike = comment.isILiked ? "#FF7555" : "#535165";

  return (
    <div className={s.comment_wrapper}>
      <div className={s.comment_author_wrapper}>
        <div className={s.comment_author} style={avatar}></div>
      </div>

      <div className={s.comment_main}>
        <p>
          <b>{comment.user.first_name + " " + comment.user.last_name}</b>
          {comment.comment}
        </p>
        <div className={s.comment_controls}>
          <p>{formatDate(comment.createdAt)}</p>
          <div title="Like" className={s.likes_comment} onClick={setCommentLike}>
            <svg
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="30px"
              height="30px"
              fill={colorLike}
              viewBox="0 0 544.582 544.582"
            >
              <g>
                <path
                  d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
		C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
		c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                />
              </g>
            </svg>
            {comment.likesCount}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
