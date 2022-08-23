import React from "react";
import BlockComponent from "../BlockComponent/BlockComponent";
import s from "./NewsBlock.module.css";

export const NewsBlock = ({t, newsElement, width, margin}:any) => {

    return <BlockComponent title={t("home.news")} width={width} margin={margin} component={
        <div className={s.news_block}>
        <p>{newsElement?.title}</p>
        <p>{newsElement?.description}</p>
        <a href={newsElement?.url} target="blank">
            {t('home.readMore')}
        </a>
        <img src={newsElement?.urlToImage} alt="" width={200} />
    </div>} />
}