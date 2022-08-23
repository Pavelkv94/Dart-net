import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Empty.module.css";

type FlagType = "post" | "saved";

export const Empty = ({ t, title, width, flag }: any) => {

    const style = {width}
    return (
        <div className={s.empty} style={style}>
            <h2>{t(title)}</h2>
            {flag === "saved" && <NavLink to="">{t('profile.startActivity')}</NavLink>}
            {flag === "saved" ? <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="130px" fill="#dfdfdf" height="130px" viewBox="0 0 544.582 544.582">
                <g>
                    <path
                        d="M448.069,57.839c-72.675-23.562-150.781,15.759-175.721,87.898C247.41,73.522,169.303,34.277,96.628,57.839
C23.111,81.784-16.975,160.885,6.894,234.708c22.95,70.38,235.773,258.876,263.006,258.876
c27.234,0,244.801-188.267,267.751-258.876C561.595,160.732,521.509,81.631,448.069,57.839z"
                    />
                </g>
            </svg> :
            <svg width="148px" height="148px" viewBox="0 0 48 48" version="1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 48 48">
    <path fill="#FF5722" d="M32,15v28H10c-2.2,0-4-1.8-4-4V15H32z"/>
    <path fill="#FFCCBC" d="M14,5v34c0,2.2-1.8,4-4,4h29c2.2,0,4-1.8,4-4V5H14z"/>
    <g fill="#FF5722">
        <rect x="20" y="10" width="18" height="4"/>
        <rect x="20" y="17" width="8" height="2"/>
        <rect x="30" y="17" width="8" height="2"/>
        <rect x="20" y="21" width="8" height="2"/>
        <rect x="30" y="21" width="8" height="2"/>
        <rect x="20" y="25" width="8" height="2"/>
        <rect x="30" y="25" width="8" height="2"/>
        <rect x="20" y="29" width="8" height="2"/>
        <rect x="30" y="29" width="8" height="2"/>
        <rect x="20" y="33" width="8" height="2"/>
        <rect x="30" y="33" width="8" height="2"/>
        <rect x="20" y="37" width="8" height="2"/>
        <rect x="30" y="37" width="8" height="2"/>
    </g>
</svg>}

        </div>
    );
};
