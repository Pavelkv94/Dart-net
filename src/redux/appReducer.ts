import { AppDispatchType } from "./store";
import { API } from "../api/api";

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
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isAuth: false,
    user: {} as any,
    weather: {} as WeatherType,
    photo: ""
};

export type InitialStateType = typeof initialState;

export function appReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case "SET-APP-STATUS":
            return { ...state, status: action.status };
        case "SET-APP-LOGIN":
            return { ...state, user: action.user, isAuth: true };
        case "SET-APP-ERR":
            return { ...state, error: action.err };
        case "SET_ME":
            return {
                ...state,
                isAuth: true,
                user: { ...action.payload, token: state.user.token },
            };
        case "SET-WEATHER":
            return { ...state, weather: action.payload };
        case "LOGOUT":
            return { ...state, isAuth: false, user: {} };
        case "GET-PHOTO":
            return { ...state, photo: action.photo };

        default:
            return state;
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "SET-APP-STATUS",
        status,
    };
};

export const setAppErrAC = (err: string) => {
    return {
        type: "SET-APP-ERR",
        err,
    };
};

const setAppAuthAC = (user: any) => {
    return {
        type: "SET-APP-LOGIN",
        user,
    };
};
const meAC = (payload: any) => ({
    type: "SET_ME",
    payload,
});

export const logoutAC = () => ({
    type: "LOGOUT",
});

const getPhotoAC = (photo: string) => ({
    type: "GET-PHOTO",
    photo
});

export const getPhotoTC = (user_id: string) => async (dispatch: AppDispatchType) => {
    await API.getPhoto(user_id)
        .then((res) => dispatch(getPhotoAC(res.data.photo)))
        .catch((e) => {
            dispatch(setAppErrAC(e.response ? e.response.data.message : "Error get photo"));
        });
};

export const loginTC = (payload: any) => async (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC("loading"));
    await API.login(payload)
        .then((res) => {
            dispatch(setAppAuthAC(res.data));
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user_id);
            localStorage.setItem("role", res.data.roles);
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((e) => {
            dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
            dispatch(setAppStatusAC("failed"));
        });
};

export const registrationTC = (payload: any) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC("loading"));
    API.registration(payload)
        .then((res) => {
            dispatch(setAppStatusAC("succeeded"));
            dispatch(setAppErrAC(""));
        })
        .catch((e) => {
            dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
            dispatch(setAppStatusAC("failed"));
        });
};

export const meTC = (user_id: string | null) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC("loading"));

    API.me(user_id)
        .then((res) => {
            dispatch(meAC(res.data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((e) => {
            dispatch(setAppStatusAC("failed"));
            dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
        });
};

const setWeatherAC = (payload: any) => ({
    type: "SET-WEATHER",
    payload,
});
export const getWeatherTC = (city_id: string) => (dispatch: AppDispatchType) => {
    API.getWeather(city_id)
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
