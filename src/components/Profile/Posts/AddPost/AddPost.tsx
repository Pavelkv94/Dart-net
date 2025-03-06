import { useState } from "react";
import { ButtonOrange } from "../../../common/ButtonOrange/ButtonOrange";
import arrowRight from "../../../../assets/svg/arrow-right.svg";
import arrowDown from "../../../../assets/svg/arrow-down.svg";
import clip from "../../../../assets/svg/clip.svg";
import emptyProfile from "../../../../assets/empty-profile.png";
import s from "./AddPost.module.css";
import { useDispatch } from "react-redux";
import { AppDispatchType } from "../../../../redux/store";
import { createPostTC, PostBodyType } from "../../../../redux/postsReducer";
//@ts-ignore  
import { ReactI18NextChild } from "react-i18next";
import { ProfileInfoType } from "../../../../redux/profileReducer";
//@ts-ignore
import emoji from "emoji-dictionary";

type AddPostPropsType = {
  t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
  profileData: ProfileInfoType;
  setTextareaFocus: (value: boolean) => void;
};

const AddPost = ({ t, profileData, setTextareaFocus }: AddPostPropsType) => {
  const dispatch = useDispatch<AppDispatchType>();

  const [openImgUrl, setOpenImgUrl] = useState<boolean>(false);

  const initialPost = {
    image_url: "",
    text: "",
  };

  const [post, setPost] = useState<PostBodyType>(initialPost);

  const createPost = () => {
    dispatch(createPostTC(post, profileData.id));
    setPost(initialPost);
    setTextareaFocus(false);
  };

  const [emojiCollapse, setEmojiCollapse] = useState<boolean>(true);

  const avatar = {
    backgroundImage: profileData.photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${profileData.photo})` : `url(${emptyProfile})`,
  };

  return (
    <div>
      <div className={s.type_post}>
        <div className={s.post_author_wrapper}>
          <div className={s.post_author} style={avatar}></div>
        </div>
        <textarea
          cols={30}
          rows={4}
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.currentTarget.value })}
          onFocus={() => setTextareaFocus(true)}
        />
      </div>
      {openImgUrl && (
        <div className={s.pin_img_url}>
          <p>{t("posts.enterImgUrl")}</p>
          <input
            type="text"
            placeholder="https://example.com/template.png"
            value={post.image_url}
            onChange={(e) => setPost({ ...post, image_url: e.currentTarget.value })}
          />
        </div>
      )}
      <div className={s.create_post_controls}>
        <div className={s.emoji_wrapper}>
          <div className={s.arrow_wrapper} onClick={() => setEmojiCollapse((prev) => !prev)}>
            <img src={emojiCollapse ? arrowRight : arrowDown} alt="arrow" />
          </div>
          <div className={s.emojiBlock} style={emojiCollapse ? { height: "20px" } : { height: "114px" }}>
            {emoji.unicode.map((m: string, i: number) => (
              <div className={s.emoji} onClick={() => setPost({ ...post, text: post.text + m })} key={i}>
                {m}
              </div>
            ))}
          </div>
        </div>
        <div className={s.clip} title={t("posts.pinPicture")} onClick={() => setOpenImgUrl((prev) => !prev)}>
          <img src={clip} alt="clip" width={22} height={22} />
        </div>
        <ButtonOrange width={200} height={40} alignSelf={"self-end"} title={t("posts.publish")} onClick={createPost} />
      </div>
    </div>
  );
};

export default AddPost;
