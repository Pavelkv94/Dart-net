import { AppDispatchType } from "./store";
import { authAPI, LoginPayloadType, RegistrationPayloadType } from "../api/authAPI";
import * as AppConstants from "./AppContants";
import { setProfileInfoAC, setProfileStatusAC } from "./profileReducer";

export enum RequestStatus {
  IDLE = "idle",
  LOADING = "loading",
  SUCCEEDED = "succeeded",
  FAILED = "failed",
}
type ActionType = any;

const initialState = {
  status: "idle" as RequestStatus,
  error: null as string | null,
  isAuth: false,
  user: {} as any,
  photo: "",
};

export type InitialStateType = typeof initialState;

export function appReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case AppConstants.AUTH_STATUS:
      return { ...state, isAuth: action.status };
    // case "SET-APP-STATUS":
    //   return { ...state, status: action.status };
    // // case "SET-APP-LOGIN":
    // //   return { ...state, user: action.user, isAuth: true };
    // case "SET-APP-ERR":
    //   return { ...state, error: action.err };
    case AppConstants.FETCH_ME:
      return {
        ...state,
        user: action.payload,
      };

    // case "LOGOUT":
    //   return { ...state, isAuth: false, user: {} };
    // case "GET-PHOTO":
    //   return { ...state, photo: action.photo };

    default:
      return state;
  }
}

export const setAppStatusAC = (status: RequestStatus) => {
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

export const setAppAuthAC = (status: boolean) => {
  return {
    type: AppConstants.AUTH_STATUS,
    status,
  };
};
const meAC = (payload: any) => ({
  type: AppConstants.FETCH_ME,
  payload,
});

export const logoutAC = () => ({
  type: AppConstants.LOGOUT,
});

const getPhotoAC = (photo: string) => ({
  type: "GET-PHOTO",
  photo,
});

export const getPhotoTC = (user_id: string) => async (dispatch: AppDispatchType) => {
  //   await API.getPhoto(user_id)
  //     .then((res) => dispatch(getPhotoAC(res.data.photo)))
  //     .catch((e) => {
  //       dispatch(setAppErrAC(e.response ? e.response.data.message : "Error get photo"));
  //     });
};

export const loginTC = (payload: LoginPayloadType) => async (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC(RequestStatus.LOADING));
  await authAPI
    .login(payload)
    .then((res) => {
      localStorage.setItem("token", res.data.accessToken);
      dispatch(setAppAuthAC(true));
      dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
    })
    .catch((e) => {
      dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
      dispatch(setAppStatusAC(RequestStatus.FAILED));
    });
};

export const registrationTC = (payload: RegistrationPayloadType) => (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC(RequestStatus.LOADING));
  authAPI
    .registration(payload)
    .then(() => {
      dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
      dispatch(setAppErrAC(""));
    })
    .catch((e) => {
      dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
      dispatch(setAppStatusAC(RequestStatus.FAILED));
    });
};

export const getMeTC = () => (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC(RequestStatus.LOADING));
  authAPI
    .me()
    .then((res) => {
      dispatch(meAC(res.data));
      dispatch(setProfileInfoAC(res.data));
      dispatch(setProfileStatusAC(RequestStatus.SUCCEEDED));
      dispatch(setAppStatusAC(RequestStatus.SUCCEEDED));
    })
    .catch((e) => {
      dispatch(setAppStatusAC(RequestStatus.FAILED));
      dispatch(setAppErrAC(e.response ? e.response.data.message : "Server is not available"));
    });
};

export const logoutTC = () => (dispatch: AppDispatchType) => {
  authAPI.logout().then(() => {
    dispatch(logoutAC());
    dispatch(setAppAuthAC(false));
  });
};
