import { AppDispatchType } from './store';
import { API } from "../api/api";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ActionType = any;

const initialState = {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isAuth: false,
    user: {} as any
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
                user: {...action.payload, token: state.user.token, }
            };
        case "LOGOUT":
            return { ...state, isAuth: false, user: {} };
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
    payload
});

export const logoutAC = () => ({
    type: "LOGOUT",
});

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
            dispatch(setAppErrAC(''))
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
