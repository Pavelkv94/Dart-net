import { AppDispatchType } from "./store";
import { outDataAPI } from "../api/outDataAPI";
import * as AppConstants from "./AppContants";

type WeatherPayloadType = {
  temperature: number;
  summary: string;
  realfeel: number;
  city: string;
  dayWeek: number;
  day: number;
  month: number;
};

export type NewsPayloadType = {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

type ActionType = {
  type: string;
  payload: NewsPayloadType[] | WeatherPayloadType;
};

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
  news: [] as NewsPayloadType[],
};

export type InitialStateType = typeof initialState;

export function outDataReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case AppConstants.FETCH_WEATHER:
      return { ...state, weather: action.payload as WeatherType };
    case AppConstants.FETCH_NEWS:
      return { ...state, news: action.payload as NewsPayloadType[] };
    default:
      return state;
  }
}

const getNewsAC = (payload: NewsPayloadType[]) => ({
  type: AppConstants.FETCH_NEWS,
  payload,
});

export const getNewsTC = (lang: string) => async (dispatch: AppDispatchType) => {
  await outDataAPI.getNews(lang).then((res: { data: { articles: NewsPayloadType[] } }) => dispatch(getNewsAC(res.data.articles)));
};

const setWeatherAC = (payload: WeatherPayloadType) => ({
  type: AppConstants.FETCH_WEATHER,
  payload,
});

export const getWeatherTC = (city_id: string) => async (dispatch: AppDispatchType) => {
  const weatherResponse = await outDataAPI.getWeather(city_id);
  const payload = {
    temperature: weatherResponse.data[0].Temperature.Metric.Value,
    summary: weatherResponse.data[0].WeatherText,
    realfeel: 0,
    city: city_id,
    dayWeek: +new Date().getDay(),
    day: +new Date().getDate(),
    month: +new Date().getMonth(),
  };
  dispatch(setWeatherAC(payload));
};
