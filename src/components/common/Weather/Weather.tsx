import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getWeatherTC, WeatherType } from "../../../redux/appReducer";
import { AppDispatchType, AppStateType } from "../../../redux/store";
import s from "./Weather.module.css";
import sun from "../../../assets/svg/weather-sun.svg";
import { useDispatch } from "react-redux";
import { ReactI18NextChild } from "react-i18next";

type WeatherPropsType = {
    t: (value: string) => ReactI18NextChild | Iterable<ReactI18NextChild>;
};

const Weather = React.memo(({ t }: WeatherPropsType) => {
    const dispatch = useDispatch<AppDispatchType>();

    const weather = useSelector<AppStateType, WeatherType>((state) => state.app.weather);

    const [city, setCity] = useState("28580");

    const cities = [
        { title: "minsk", code: "28580" },
        { title: "moscow", code: "294021" },
        { title: "london", code: "328328" },
        { title: "paris", code: "623" },
        { title: "warsaw", code: "274663" },
        { title: "newYork", code: "349727" },
        { title: "prague", code: "125594" },
        { title: "amsterdam", code: "249758" },
        { title: "cyprus", code: "219957" },
        { title: "sydney", code: "22889" },
    ];

    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

    useEffect(() => {
        dispatch(getWeatherTC(city));
    }, [dispatch, city]);

    return (
        <div className={s.weather}>
            <div className={s.weather_header}>
                <div>
                    <select name="select" className={s.city_select} onChange={(e) => setCity(e.target.value)}>
                        {cities.map((el, i) => (
                            <option key={i} value={el.code} defaultValue={el.code} >
                                {t(`cities.${el.title}`)}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <img src={sun} alt="" width={60} height={60} />
                </div>
            </div>
            <div className={s.weather_main}>
                <div className={s.weather_main_col1}>
                    <div className={s.weather_dayWeek}>{t(`days.${days[weather.dayWeek - 1]}`)}</div>
                    <div className={s.weather_day}>
                        <span>{t(`months.${months[weather.month - 1]}`)}</span>
                        <span>{weather.day}</span>
                    </div>
                </div>
                <div className={s.weather_main_col2}>
                    <div className={s.weather_temp}>{weather.temperature} &#8451;</div>
                </div>
            </div>
        </div>
    );
});

export default Weather;
