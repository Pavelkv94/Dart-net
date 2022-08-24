import { AppDispatchType } from "./store";
import { outDataAPI } from "../api/outDataAPI";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ActionType = any;
export type WeatherType = {
    temperature: number;
    summary: string;
    realfeel: number;
    city: string;
    dayWeek: number;
    day: number;
    month: number;
};
const initialState = {
    weather: {} as WeatherType,
    news: [] as any,
    covid: {} as any
};

export type InitialStateType = typeof initialState;

export function outDataReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        // case "SET-APP-STATUS":
        //     return { ...state, status: action.status };
        case "SET-WEATHER":
            return { ...state, weather: action.payload };
        case "SET-NEWS":
            return { ...state, news: action.payload };
            case "SET-COVID":
                return { ...state, covid: action.payload };
            
        default:
            return state;
    }
}

const getNewsAC = (payload: any) => ({
    type: "SET-NEWS",
    payload,
});

export const getNewsTC = (lang: string) => async (dispatch: AppDispatchType) => {
    await outDataAPI.getNews(lang).then((res: any) => dispatch(getNewsAC(res.data.articles)));
};

const setWeatherAC = (payload: any) => ({
    type: "SET-WEATHER",
    payload,
});

export const getWeatherTC = (city_id: string) => async (dispatch: AppDispatchType) => {
    await outDataAPI
        .getWeather(city_id)
        .then((res) => {
            let payload = {
                temperature: res.data.Temperature,
                summary: res.data.Summary,
                realfeel: res.data.RealFeel,
                city: city_id,
                dayWeek: +new Date().getDay(),
                day: +new Date().getDate(),
                month: +new Date().getMonth(),
            };
            dispatch(setWeatherAC(payload));
            // dispatch(setAppStatusAC("succeeded"));
            // console.log(res)
        })
        .catch((e) => {
            // dispatch(setAppErrAC(e.response ? e.response.data.message : "Weather is not available"));
        });
};

const setCovidAC = (payload: any) => ({
    type: "SET-COVID",
    payload,
});
export const getCovidTC = (country: string) => async (dispatch: AppDispatchType) => {
    await outDataAPI.getCovidStats(country).then((res) => dispatch(setCovidAC(res.data.response[0])));
};
