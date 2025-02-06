import { AppDispatchType } from "./store";
import { usersAPI } from "../api/usersAPI";

type ActionType = any;

const initialState = {
  users: [],
  currentProfile: {},
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

export const followTC = (payload: any) => async (dispatch: any) => {
  await usersAPI.follow(payload).then((res) => {
    dispatch(getUsersTC());
  });
};

export const unfollowTC = (payload: any) => async (dispatch: any) => {
  await usersAPI.unfollow(payload).then((res) => {
    dispatch(getUsersTC());
  });
};
