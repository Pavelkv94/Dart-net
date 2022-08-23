import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNewsTC } from "../../redux/outDataReducer";
import { getPostsTC, PostType } from "../../redux/postsReducer";
import { AppDispatchType, AppStateType } from "../../redux/store";
import BlockComponent from "../common/BlockComponent/BlockComponent";
import { NewsBlock } from "../common/NewsBlock/NewsBlock";
import Post from "../common/Post/Post";
import Weather from "../common/Weather/Weather";
import s from "./Home.module.css";

const Home = () => {
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatchType>();

    const allPosts = useSelector<AppStateType, Array<PostType>>((state) => state.posts.posts);
    const news = useSelector<AppStateType, any>((state) => state.outData.news);

    const [rotate, setRotate] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getPostsTC("all"));
    }, [dispatch]);

    useEffect(() => {
        news.length < 1 && dispatch(getNewsTC());
    }, [news, dispatch]);

    useEffect(() => {
        setTimeout(() => setRotate(false), 2000);
    }, [rotate]);

    const reloadUsers = () => {
        dispatch(getPostsTC("all"));
        setRotate(true);
    };

    return (
        <div className={s.home}>
            <section className={s.left_panel}>
                <Weather t={t} width={"calc(100% - 60px)"} />
                <BlockComponent title={t("profile.personalInfo")} width={"calc(100% - 60px)"} component={<div>asdasd</div>} />
            </section>
            <section className={s.main_panel}>
                <div className={s.reload} onClick={reloadUsers}>
                    <svg className={rotate ? s.rotate : ""} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 342.5 342.5">
                        <path
                            d="M254.37,22.255c-1.161-0.642-2.53-0.795-3.803-0.428c-1.274,0.367-2.35,1.226-2.992,2.387l-21.758,39.391
	c-1.335,2.417-0.458,5.459,1.96,6.794C264.616,90.748,287.5,129.495,287.5,171.52c0,63.649-51.782,115.431-115.431,115.431
	S56.638,235.169,56.638,171.52c0-23.888,7.557-47.427,21.382-66.897l34.478,34.478c1.338,1.337,3.315,1.806,5.109,1.21
	c1.795-0.596,3.101-2.152,3.374-4.024L139.963,6.271c0.228-1.563-0.295-3.141-1.412-4.258c-1.117-1.117-2.7-1.639-4.258-1.412
	L4.278,19.584c-1.872,0.273-3.428,1.579-4.023,3.374c-0.596,1.795-0.127,3.772,1.21,5.109l37.292,37.292
	C14.788,95.484,1.638,133,1.638,171.52c0,93.976,76.455,170.431,170.431,170.431c93.976,0,170.431-76.455,170.431-170.431
	C342.5,109.478,308.731,52.283,254.37,22.255z"
                        />
                    </svg>
                </div>

                {allPosts.map((el, i) => (
                    <Post key={i} width={"calc(100% - 40px)"} postData={el} t={t} />
                ))}
            </section>
            <section className={s.right_panel}>
                <NewsBlock t={t} newsElement={news[Math.floor(Math.random() * 100)]} width={"calc(100% - 60px)"} margin={"0 0 20px 20px"} />
                <NewsBlock t={t} newsElement={news[Math.floor(Math.random() * 100)]} width={"calc(100% - 60px)"} margin={"0 0 20px 20px"} />
                <NewsBlock t={t} newsElement={news[Math.floor(Math.random() * 100)]} width={"calc(100% - 60px)"} margin={"0 0 20px 20px"} />
                <NewsBlock t={t} newsElement={news[Math.floor(Math.random() * 100)]} width={"calc(100% - 60px)"} margin={"0 0 20px 20px"} />
            </section>
        </div>
    );
};

export default Home;
