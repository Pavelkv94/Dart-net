import { postsAPI } from "./../api/postsAPI";
import { AppDispatchType } from "./store";
import { API } from "../api/api";
import { usersAPI } from "../api/usersAPI";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ActionType = any;

const initialState = {
    users: [],
};

export type InitialStateType = typeof initialState;

export function usersReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        // case "SET-APP-STATUS":
        //     return { ...state, status: action.status };
        case "GET-USERS":
            return { ...state, users: action.payload };
        default:
            return state;
    }
}

const setUsersAC = (payload: any) => ({
    type: "GET-USERS",
    payload,
});

export const getUsersTC = () => async (dispatch: AppDispatchType) => {
    await usersAPI.getUsers().then((res) => {
        dispatch(setUsersAC(res.data));
    });
};

export const followTC = (payload: any) => async (dispatch: AppDispatchType) => {
    await usersAPI.follow(payload).then((res) => {
        dispatch(getUsersTC());
    });
};

export const unfollowTC = (payload: any) => async (dispatch: AppDispatchType) => {
    await usersAPI.unfollow(payload).then((res) => {
        dispatch(getUsersTC());
    });
};
