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
        case "SET-APP-AUTH":
            return { ...state, user: action.user };
        case "SET-APP-ERR":
            return { ...state, error: action.err };
        case "SET_ME":
            return { ...state, isAuth: true };
        case "LOGOUT":
            return { ...state, isAuth: false };
        case "SET_ME_DATA":
            return {
                ...state,
                user: { ...state.user, username: action.payload.username },
            };

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

const setAppAuthAC = (user?: any) => {
    return {
        type: "SET-APP-AUTH",
        user,
    };
};
const meAC = () => ({
    type: "SET_ME",
});
const meDataAC = (payload: any) => ({
    type: "SET_ME_DATA",
    payload,
});

export const logoutAC = () => ({
    type: "LOGOUT",
});

export const loginTC = (payload: any) => async (dispatch: any) => {
    dispatch(setAppStatusAC("loading"));
    await API.login(payload)
        .then((res) => {
            console.log(res.data)
            dispatch(setAppAuthAC(res.data));
            //@ts-ignore
            localStorage.setItem("token", res.data.token);
            //@ts-ignore
            localStorage.setItem("user_id", res.data.user_id);
            //@ts-ignore
            localStorage.setItem("role", res.data.roles);
        })
        .then(() => {
            dispatch(meAC());
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((e) => {
            dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
            dispatch(setAppStatusAC("failed"));
        });
};

export const registrationTC = (payload: any) => (dispatch: any) => {
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

export const meTC = (user_id: string | null) => (dispatch: any) => {
    dispatch(setAppStatusAC("loading"));

    API.me(user_id)
        .then((res) => {
            dispatch(meAC());
            dispatch(meDataAC(res.data));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((e) => {;
            // dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
        });
};
