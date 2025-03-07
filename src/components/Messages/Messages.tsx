import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import clip from "../../assets/svg/clip.svg";
import { AppDispatchType, AppStateType } from "../../redux/store";
import s from "./Messages.module.css";
import emptyProfile from "../../assets/empty-profile.png";
import { useDispatch } from "react-redux";
import arrowRight from "../../assets/svg/arrow-right.svg";
import arrowDown from "../../assets/svg/arrow-down.svg";
import { ButtonOrange } from "../common/ButtonOrange/ButtonOrange";
import { useTranslation } from "react-i18next";
import { getMessagesTC, MessagePayloadType, MessageType } from "../../redux/messagesReducer";
//@ts-ignore
import emoji from "emoji-dictionary";
import { formatDate } from "../../utils/formatDate";

const Messages = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatchType>();

  const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
  //@ts-ignore
  const photo = useSelector<AppStateType, string>((state) => state.app.user?.photo);
  //@ts-ignore
  const user_id = useSelector<AppStateType, string>((state) => state.app.user?.id);
  //@ts-ignore
  const messages = useSelector<AppStateType, Array<MessageType[]>>((state) => state.messages.messages);

  const initialMessage: MessagePayloadType = {
    user_id,
    message: "",
    event: "message",
    image: "",
  };

  const [openImgUrl, setOpenImgUrl] = useState<boolean>(false);
  const [emojiCollapse, setEmojiCollapse] = useState<boolean>(true);
  const [message, setMessage] = useState(initialMessage);

  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    dispatch(getMessagesTC());
  }, [dispatch]);

  useEffect(() => {
    socket.current = new WebSocket(import.meta.env.VITE_WS_URL);

    socket.current.onopen = () => {
      console.log("WEBSOCKET OPEN");
    };
    socket.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      console.log(message);
      // dispatch(newMessageAC(message))
      dispatch(getMessagesTC());
    };
    socket.current.onclose = () => {
      console.log("Socket закрыт");
    };
    socket.current.onerror = () => {
      console.log("Socket произошла ошибка");
    };
  }, [dispatch]);

  const sendMessage = async () => {
    socket.current?.send(JSON.stringify(message));
    setMessage({ ...message, message: "" });
  };

  const avatar = {
    backgroundImage: photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${photo})` : `url(${emptyProfile})`,
  };

  if (!isAuth) {
    return <Navigate to="/" />;
  } else
    return (
      <div className={s.messages_wrapper}>
        <section className={s.left_panel}>Messages</section>
        <section className={s.main}>
          <div className={s.messages}>
            {/* @ts-ignore */}
            {messages.map((mess: MessageType) => {
              return (
                <div key={mess.id} className={`${s.message_item_wrapper} ${mess.user_id === user_id && s.reverse}`}>
                  <div className={s.avatar_wrapper}>
                    <NavLink to={mess.user_id === user_id ? `/` : `/${mess.user_id}`}>
                      <div
                        className={s.avatar}
                        style={{
                          backgroundImage: mess.user?.photo ? `url(${import.meta.env.VITE_REACT_APP_HOST}${mess.user.photo})` : `url(${emptyProfile})`,
                        }}
                      ></div>
                    </NavLink>
                  </div>
                  <div>
                    <div className={`${s.message_item} ${mess.user_id === user_id && s.right}`}>
                      <p>{mess.message.trim()}</p>
                      {mess.image && (
                        <div className={s.message_image}>
                          <img src={mess.image} alt="message img pin" width={100} />
                        </div>
                      )}
                    </div>
                    <p className={s.message_data}>{formatDate(mess.createdAt)}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={s.send_message}>
            <div className={s.type_message}>
              <div className={s.message_author_wrapper}>
                <div className={s.message_author} style={avatar}></div>
              </div>
              <textarea cols={30} rows={4} value={message.message} onChange={(e) => setMessage({ ...message, message: e.target.value })} />
            </div>
            {openImgUrl && (
              <div className={s.pin_img_url}>
                <p>{t("posts.enterImgUrl")}</p>
                <input
                  type="text"
                  placeholder="https://example.com/template.png"
                  value={message.image}
                  onChange={(e) => {
                    setMessage({ ...message, image: e.currentTarget.value });
                  }}
                />
              </div>
            )}
            <div className={s.create_message_controls}>
              <div className={s.emoji_wrapper}>
                <div className={s.arrow_wrapper} onClick={() => setEmojiCollapse((prev) => !prev)}>
                  <img src={emojiCollapse ? arrowRight : arrowDown} alt="arrow" />
                </div>
                <div className={s.emojiBlock} style={emojiCollapse ? { height: "20px" } : { height: "114px" }}>
                  {emoji.unicode.map((m: any, i: number) => (
                    <div className={s.emoji} onClick={() => setMessage({ ...message, message: message.message + m })} key={i}>
                      {m}
                    </div>
                  ))}
                </div>
              </div>
              <div className={s.clip} title={t("posts.pinPicture")} onClick={() => setOpenImgUrl((prev) => !prev)}>
                <img src={clip} alt="clip" width={22} height={22} />
              </div>
              <ButtonOrange
                width={200}
                height={40}
                alignSelf={"self-end"}
                title={t("messages.send")}
                onClick={sendMessage}
                disabled={message.message.trim() === ""}
              />
            </div>
            {/* <span style={{ color: "red" }}>Chat is not available on the free backend hosting</span> */}
          </div>
        </section>
      </div>
    );
};

export default Messages;
