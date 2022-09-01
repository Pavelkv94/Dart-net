import React, { useEffect, useRef, useState } from "react";
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
import { getMessagesTC, MessageType, newMessageAC } from "../../redux/messagesReducer";

const emoji = require("emoji-dictionary");

const Messages = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatchType>();

    const isAuth = useSelector<AppStateType, boolean>((state) => state.app.isAuth);
    const photo = useSelector<AppStateType, string>((state) => state.app.photo);
    const user_id = useSelector<AppStateType, string>((state) => state.app.user.user_id);
    const messages = useSelector<AppStateType, Array<MessageType>>((state) => state.messages.messages);

    const initialMessage = {
        user_id,
        photo,
        message: "",
        id: Math.random(),
        event: "message",
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        image: ""
    };

    const [openImgUrl, setOpenImgUrl] = useState<boolean>(false);
    const [emojiCollapse, setEmojiCollapse] = useState<boolean>(true);
    const [message, setMessage] = useState(initialMessage);

    const socket = useRef<any>();

    useEffect(() => {dispatch(getMessagesTC())}, []); //!

    useEffect(() => {
        
        socket.current = new WebSocket("ws://dart-social-network.herokuapp.com");

        socket.current.onopen = () => {
            console.log("WEBSOCKET OPEN")
        };
        socket.current.onmessage = (event: any) => {
            // const message = JSON.parse(event.data);
            // dispatch(newMessageAC(message))
            dispatch(getMessagesTC())
        };
        socket.current.onclose = () => {
            console.log("Socket закрыт");
        };
        socket.current.onerror = () => {
            console.log("Socket произошла ошибка");
        };
    }, []);

    const sendMessage = async () => {
        socket.current.send(JSON.stringify(message));
        setMessage(initialMessage);
    };

    const avatar = {
        backgroundImage: photo ? `url(${process.env.REACT_APP_HOST}${photo})` : `url(${emptyProfile})`,
    };

    if (!isAuth) {
        return <Navigate to="/login" />;
    } else
        return (
            <div className={s.messages_wrapper}>
                <section className={s.left_panel}>Messages</section>
                <section className={s.main}>
                    <div className={s.messages}>
                        {messages.map((mess: any) => {
                            return (
                                <div key={mess.id} className={`${s.message_item_wrapper} ${mess.user_id === user_id && s.reverse}`}>
                                    <div className={s.avatar_wrapper}>
                                        <NavLink to={mess.user_id === user_id ? `/` : `/${mess.user_id}`}>
                                            <div
                                                className={s.avatar}
                                                style={{
                                                    backgroundImage: mess.photo ? `url(${process.env.REACT_APP_HOST}${mess.photo})` : `url(${emptyProfile})`,
                                                }}
                                            ></div>
                                        </NavLink>
                                    </div>
                                    <div>
                                        <div className={`${s.message_item} ${mess.user_id === user_id && s.right}`}>
                                            <p>{mess.message.trim()}</p>
                                            {mess.image && <div className={s.message_image}><img src={mess.image} alt="message img pin" width={100} /></div>}
                                        </div>
                                        <p className={s.message_data}>{mess.date}</p>
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
                                <input type="text" placeholder="https://example.com/template.png" value={message.image} onChange={(e) => {setMessage({...message, image: e.currentTarget.value})}} />
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
                            {/* @ts-ignore */}
                            <div className={s.clip} title={t("posts.pinPicture")} onClick={() => setOpenImgUrl((prev) => !prev)}>
                                <img src={clip} alt="clip" width={22} height={22} />
                            </div>
                            <ButtonOrange width={200} height={40} alignSelf={"self-end"} title={t("messages.send")} onClick={sendMessage} disabled={message.message.trim() === ""}/>
                        </div>
                    </div>
                </section>
            </div>
        );
};

export default Messages;
