// import React, { useEffect, useState } from "react";
// import s from "./Covid.module.css";
// import covid_protect from "../../../assets/svg/covid-protect.svg";
// import { useDispatch } from "react-redux";
// import { AppDispatchType, AppStateType } from "../../../redux/store";
// import { getCovidTC } from "../../../redux/outDataReducer";
// import { useSelector } from "react-redux";

// export const Covid = ({ width, t }: any) => {
//     const dispatch = useDispatch<AppDispatchType>();

//     const style = { width };

//     const [country, setCountry] = useState("belarus");

//     const covidData = useSelector<AppStateType, any>(state => state.outData.covid);

//     const countries = [
//         { data: "Belarus", title: "belarus" },
//         { data: "Poland", title: "poland" },
//         { data: "Russia", title: "russia" },
//         { data: "UK", title: "unitedKingdom" },
//         { data: "France", title: "france" },
//         { data: "Turkey", title: "turkey" },
//         { data: "Canada", title: "canada" },
//         { data: "China", title: "china" },
//         { data: "Germany", title: "germany" },
//     ];

//     useEffect(() => {
//         dispatch(getCovidTC(country));
//     }, [dispatch, country]);

//     return (
//         <div className={s.covid_wrapper} style={style}>
//             <div className={s.covid_header}>
//                 <div>
//                     <select name="select" className={s.covid_select} onChange={(e) => setCountry(e.target.value)}>
//                         {countries.map((el, i) => (
//                             <option key={i} value={el.data} defaultValue={el.data}>
//                                 {t(`countries.${el.title}`)}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div className={s.covid_img_protect}>
//                     <img src={covid_protect} alt="covid protect" width={70} height={70} />
//                 </div>
//             </div>
//             <div className={s.covid_main}>
//               <h2>Covid Monitor</h2>
//                 <span>{t('covid.population')}<b>{covidData.population ? covidData.population : 0}</b></span>
//                 <span>{t('covid.newCases')}<b>{covidData.cases?.new ? covidData.cases.new : 0}</b></span>
//                 <span>{t('covid.totalCases')}<b>{covidData.cases?.total ? covidData.cases.total : 0}</b></span>
//                 <span>{t('covid.activeCases')}<b>{covidData.cases?.active ? covidData.cases.active : 0}</b></span>
//                 <span>{t('covid.newDeaths')}<b>{covidData.deaths?.new ? covidData.deaths.new : 0}</b></span>
//                 <span>{t('covid.totalDeaths')}<b>{covidData.deaths?.total ? covidData.deaths.total : 0}</b></span>
//                 <span>{t('covid.totalTests')}<b>{covidData.tests?.total ? covidData.tests.total : 0}</b></span>
//             </div>
//         </div>
//     );
// };
