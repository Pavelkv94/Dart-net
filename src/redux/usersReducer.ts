import { AppDispatchType } from "./store";
import { usersAPI } from "../api/usersAPI";
import * as AppConstants from "./AppContants";
import { ProfileInfoType } from "./profileReducer";

export type DataWithPagination<T> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};

export enum ContactActionType {
  FOLLOW = "follow",
  UNFOLLOW = "unfollow",
}

export type ContactBodyType = {
  action: ContactActionType;
  targetUserId: string;
};

const initialState = {
  usersData: {} as DataWithPagination<ProfileInfoType>,
};

export type InitialStateType = typeof initialState;

type ActionType =
  | { type: typeof AppConstants.CHANGE_CONTACT_STATUS; payload: ContactBodyType }
  | { type: typeof AppConstants.FETCH_USERS; payload: DataWithPagination<ProfileInfoType> };

export function usersReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case AppConstants.CHANGE_CONTACT_STATUS:
      return {
        ...state,
        usersData: {
          ...state.usersData,
          items: state.usersData.items.map((user: ProfileInfoType) =>
            user.id === action.payload.targetUserId ? { ...user, isFriend: action.payload.action === ContactActionType.FOLLOW ? true : false } : user
          ),
        },
      };
    case AppConstants.FETCH_USERS:
      return { ...state, usersData: action.payload };
    default:
      return state;
  }
}

const setUsersAC = (payload: DataWithPagination<ProfileInfoType>) => ({
  type: AppConstants.FETCH_USERS,
  payload,
});

export const getUsersTC = () => async (dispatch: AppDispatchType) => {
  await usersAPI.getUsers().then((res) => {
    dispatch(setUsersAC(res.data));
  });
};

const changeContactStatusAC = (payload: ContactBodyType) => ({
  type: AppConstants.CHANGE_CONTACT_STATUS,
  payload,
});

export const setContactActionTC = (payload: ContactBodyType) => async (dispatch: AppDispatchType) => {
  await usersAPI.setContactAction(payload).then(() => {
    dispatch(changeContactStatusAC(payload));
  });
};
