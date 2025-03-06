import { profileAPI } from "../api/profileAPI";
import { getMeTC, RequestStatus } from "./appReducer";
import { AppDispatchType } from "./store";
import * as AppConstants from "./AppContants";

type ActionType = {
  type: string;
  payload: object | ProfileInfoType;
  photoUrl: string;
  status: RequestStatus;
};

export type ProfileInfoType = {
  id: string;
  email: string;
  login: string;
  createdAt: string;
  first_name: string;
  last_name: string;
  status: string;
  photo: string;
  background: string;
  country: string;
  birthday: string;
  facebook: string;
  youtube: string;
  vk: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  telegram: string;
  about: string;
  education: string;
  work: string;
  gender?: string;
  friends: Array<string>;
  isFriend: boolean;
};

const initialState = {
  profileData: {
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    status: "",
    photo: "",
    background: "",
    country: "",
    birthday: "",
    facebook: "",
    youtube: "",
    vk: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    telegram: "",
    about: "",
    created_at: "",
    education: "",
    work: "",
    gender: "",
    friends: [],
  },
  anotherProfileData: {
    user_id: "",
    email: "",
    first_name: "",
    last_name: "",
    status: "",
    photo: "",
    background: "",
    country: "",
    birthday: "",
    facebook: "",
    youtube: "",
    vk: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    telegram: "",
    about: "",
    created_at: "",
    education: "",
    work: "",
    friends: [],
  },
  profileStatus: "idle" as RequestStatus.IDLE,
  profileEditStatus: "idle" as RequestStatus.IDLE,
};

export type InitialStateType = typeof initialState;

export function profileReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    case AppConstants.FETCH_PROFILE_INFO:
      return { ...state, profileData: action.payload as InitialStateType['profileData'] };
    case AppConstants.FETCH_ANOTHER_PROFILE_INFO:
      return { ...state, anotherProfileData: action.payload as InitialStateType['anotherProfileData'] };
    case AppConstants.SAVE_PHOTO:
      return { ...state, profileData: { ...state.profileData, photo: action.photoUrl } };
    // case "SET-PROFILE-STATUS":
    //   return { ...state, profileStatus: action.status };
    // case "SET-PROFILE-EDIT-STATUS":
    //   return { ...state, profileEditStatus: action.status };

    default:
      return state;
  }
}

export const setProfileInfoAC = (payload: object) => {
  return {
    type: AppConstants.FETCH_PROFILE_INFO,
    payload,
  };
};

const setAnotherProfileInfoAC = (payload: object) => {
  return {
    type: AppConstants.FETCH_ANOTHER_PROFILE_INFO,
    payload,
  };
};

export const setProfileStatusAC = (status: RequestStatus) => {
  return {
    type: AppConstants.FETCH_PROFILE_STATUS,
    status,
  };
};

export const setProfileEditStatusAC = (status: RequestStatus) => {
  return {
    type: "SET-PROFILE-EDIT-STATUS",
    status,
  };
};

// export const getProfileTC = (user_id: string) => async (dispatch: AppDispatchType) => {
//   dispatch(setProfileStatusAC(RequestStatus.LOADING));
//   await profileAPI
//     .getProfileInfo(user_id)
//     .then((res) => {
//       dispatch(setProfileInfoAC(res.data));
//       dispatch(setProfileStatusAC(RequestStatus.SUCCEEDED));
//     })
//     .catch(() => {
//       dispatch(setProfileStatusAC(RequestStatus.FAILED));
//     });
// };

export const getAnotherProfileTC = (user_id: string) => async (dispatch: AppDispatchType) => {
  dispatch(setProfileStatusAC(RequestStatus.LOADING));
  await profileAPI
    .getProfileInfo(user_id)
    .then((res) => {
      const data = res.data;
      dispatch(setAnotherProfileInfoAC(data));
      dispatch(setProfileStatusAC(RequestStatus.SUCCEEDED));
    })
    .catch(() => {
      dispatch(setProfileStatusAC(RequestStatus.FAILED));
    });
};

const savePhotoAC = (photoUrl: string) => ({
  type: AppConstants.SAVE_PHOTO,
  photoUrl,
});

export const savePhotoTC = (file: File) => async (dispatch: AppDispatchType) => {
  await profileAPI.saveProfilePhoto(file).then((res) => dispatch(savePhotoAC(res.data.photoUrl)));
};

export const editProfileTC = (payload: object) => async (dispatch: AppDispatchType) => {
  dispatch(setProfileEditStatusAC(RequestStatus.LOADING));
  await profileAPI
    .updateProfile(payload)
    .then(() => {
      dispatch(getMeTC());
      dispatch(setProfileEditStatusAC(RequestStatus.SUCCEEDED));
    })
    .catch(() => dispatch(setProfileEditStatusAC(RequestStatus.FAILED)));
};
