import React from "react";
import s from "./Post.module.css";
import planet from "../../../assets/svg/about-country.svg"

const Post = ({ t, width  }: any) => {
    const style = {
        width,
    };

    return (
        <div className={s.post} style={style}>
            <div className={s.post_header}>
                <div className={s.post_avatar} ></div>
                <div className={s.post_whois}>
                    <p>Pavel Kazlou</p>
                    <span><img src={planet} alt="icon" width={14}/><p>Published: January,5 2010 19:PM</p></span>
                </div>
            </div>
            <div className={s.post_main}>
                <div className={s.post_photo}>
                    <img src="https://www.kraftwerk.at/app/uploads/fly-images/962/reference-img-worlds-of-adventure-park-4-1920x9999.jpg" alt="post screen" />
                </div>
                <div className={s.post_description}>
                    <p>
                        Vivamus suscipit tortor eget felis porttitor volutpat. Sed porttitor lectus nibh. Donec sollicitudin molestie malesuada. Nulla quis lorem ut libero malesuada feugiat. Quisque
                        velit nisi, pretium ut lacinia in, elementum id enim. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet
                        aliquam vel, ullamcorper sit amet ligula. Donec rutrum congue leo eget malesuada.
                    </p>
                </div>
            </div>
            <div className={s.post_footer}>

                footer
            </div>
        </div>
    );
};

export default Post;
