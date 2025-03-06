import { useState } from "react";
import s from "./Post.module.css";
import planet from "../../../assets/svg/about-country.svg";
import comment from "../../../assets/svg/comment.svg";
import { ReactI18NextChild } from "react-i18next";
import {
  deletePostTC,
  likedPostTC,
  PlaceType,
  PostType,
  createCommentTC,
  unlikedPostTC,
  likePostOrCommentTC,
  LikeStatus,
  LikeParentType,
} from "../../../redux/postsReducer";
import threeDots from "../../../assets/svg/three-dots.svg";
import Comment from "./Comment";
import { ButtonOrange } from "../ButtonOrange/ButtonOrange";
import { ProfileInfoType } from "../../../redux/profileReducer";
import { useSelector } from "react-redux";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import { useDispatch } from "react-redux";
import emptyProfile from "../../../assets/empty-profile.png";
import { NavLink, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import emoji from "emoji-dictionary";

type PostPropsType = {
  t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
  width?: number | string;
  postData: PostType;
  place: PlaceType;
};

const Post = ({ t, width = "100%", postData, place }: PostPropsType) => {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatchType>();

  const user_id = useSelector<AppStateType, string | undefined>((state) => state.app.user?.id);
  const profileData = useSelector<AppStateType, ProfileInfoType>((state) => state.profile.profileData);

  const style = {
    width,
  };

  const [openComments, setOpenComments] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const [commentText, setCommentText] = useState<string>("");

  const user = id ? id : user_id;

  const sendComment = () => {
    if (commentText.trim() !== "") {
      dispatch(createCommentTC({ comment: commentText, post_id: postData.id }, place, user_id));
      setCommentText("");
    }
  };

  const setPostLike = () => {
    dispatch(likePostOrCommentTC({ parent_id: postData.id, parent_type: LikeParentType.Post }, place, user_id));
  };

  const deletePost = (post_id: string | undefined) => {
    dispatch(deletePostTC(post_id, user_id, place));
    setOpenMenu(true);
  };

  const avatar = {
    backgroundImage: postData.user.photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${postData.user.photo})` : `url(${emptyProfile})`,
  };
  const myAvatar = {
    backgroundImage: profileData.photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${profileData.photo})` : `url(${emptyProfile})`,
  };

  const image = {
    backgroundImage: `url(${postData.image_url})`,
    width: "100%",
    height: "400px",
  };

  const colorLike = postData.isILiked ? "#FF7555" : "#535165";

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
        <div style={{ display: "flex" }}>
          <div className={s.post_avatar} style={avatar}></div>
          <div className={s.post_whois}>
            <NavLink to={`/${postData.user_id === user_id ? "" : postData.user_id}`}>
              {postData.user.first_name} {postData.user.last_name}
            </NavLink>
            <span>
              <img src={planet} alt="icon" width={14} />
              <p>{`${t("posts.published")} ${formatDate(postData.createdAt)}`}</p>
            </span>
          </div>
        </div>
        <div className={s.dots} onClick={() => setOpenMenu((prev) => !prev)}>
          <img src={threeDots} alt="three dots" width={30} height={30} />
          {openMenu && postData.user_id === user_id && (
            <div className={s.dots_menu} onClick={() => deletePost(postData.id)}>
              {t("posts.delete")}
            </div>
          )}
        </div>
      </div>
      <div className={s.post_main}>
        <div className={s.post_photo} style={postData.image_url ? image : {}}></div>
        <div className={s.post_description}>
          <p>{postData.text}</p>
        </div>
      </div>
      <div className={s.post_footer}>
        <div title="Like" className={s.likes} onClick={setPostLike}>
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
          {postData.likesCount}
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
              <div className={s.comment_author} style={myAvatar}></div>
            </div>
            <div className={s.comment_textarea_wrapper}>
              <textarea
                className={s.comment_textarea}
                id=""
                cols={30}
                rows={5}
                placeholder="Post your comment"
                value={commentText}
                onChange={(e) => setCommentText(e.currentTarget.value)}
              />
              <div className={s.add_comment_controls}>
                <ButtonOrange title={"Send"} width={100} height={30} onClick={sendComment} />
                <div className={s.emoji_block}>
                  {emojiArray.map((m: string, i: number) => (
                    <div className={s.emoji} onClick={() => setCommentText(commentText + m)} key={i}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {postData.comments.map((el, i) => (
            <Comment key={i} comment={el} user_id={user_id} place={place} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
