import { profileAPI } from "./../api/profileAPI";
import { AppDispatchType } from "./store";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ActionType = any;

type ContactsType = {
    facebook: string;
    youtube: string;
    vk: string;
    instagram: string;
    linkedin: string;
    twitter: string;
    telegram: string;
};

export type ProfileInfoType = {
    user_id: string;
    email: string;
    first_name: string;
    last_name: string;
    status: string;
    photo: string;
    background: string;
    country: string;
    birthday: string;
    contacts: ContactsType;
    about: string;
    created_at: string;
    education: string;
    work: string;
    gender?: string;
    friends: Array<string>;
};
const initialState = {
    profileData: {
        user_id: "",
        email: "",
        first_name: "",
        last_name: "",
        status: "",
        photo: "",
        background: "",
        country: "",
        birthday: "",
        contacts: {
            facebook: "",
            youtube: "",
            vk: "",
            instagram: "",
            linkedin: "",
            twitter: "",
            telegram: "",
        },
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
        contacts: {
            facebook: "",
            youtube: "",
            vk: "",
            instagram: "",
            linkedin: "",
            twitter: "",
            telegram: "",
        },
        about: "",
        created_at: "",
        education: "",
        work: "",
        friends: [],
    },
    profileStatus: "idle" as RequestStatusType,
    profileEditStatus: "idle" as RequestStatusType,
};

export type InitialStateType = typeof initialState;

export function profileReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        case "SET-PROFILE-INFO":
            return { ...state, profileData: action.payload };
        case "SET-ANOTHER-PROFILE-INFO":
            return { ...state, anotherProfileData: action.payload };
        case "SAVE-BACKGROUND":
            return { ...state, profileData: { ...state.profileData, background: action.url } };
        case "SAVE-PHOTO":
            return { ...state, profileData: { ...state.profileData, photo: action.photoUrl } };
        case "SET-PROFILE-STATUS":
            return { ...state, profileStatus: action.status };
        case "SET-PROFILE-EDIT-STATUS":
            return { ...state, profileEditStatus: action.status };

        default:
            return state;
    }
}

const setProfileInfoAC = (payload: any) => {
    return {
        type: "SET-PROFILE-INFO",
        payload,
    };
};

const setAnotherProfileInfoAC = (payload: any) => {
    return {
        type: "SET-ANOTHER-PROFILE-INFO",
        payload,
    };
};

export const setProfileStatusAC = (status: RequestStatusType) => {
    return {
        type: "SET-PROFILE-STATUS",
        status,
    };
};

export const setProfileEditStatusAC = (status: RequestStatusType) => {
    return {
        type: "SET-PROFILE-EDIT-STATUS",
        status,
    };
};

export const getProfileTC = (user_id: string) => async (dispatch: AppDispatchType) => {
    dispatch(setProfileStatusAC("loading"));
    await profileAPI
        .getProfileInfo(user_id)
        .then((res) => {
            let data = res.data;
            delete data["_id"];
            delete data["__v"];
            dispatch(setProfileInfoAC(data));
            dispatch(setProfileStatusAC("succeeded"));
        })
        .catch((e) => {
            dispatch(setProfileStatusAC("failed"));
        });
};

export const getAnotherProfileTC = (user_id: string) => async (dispatch: AppDispatchType) => {
    dispatch(setProfileStatusAC("loading"));
    await profileAPI
        .getProfileInfo(user_id)
        .then((res) => {
            let data = res.data;
            delete data["_id"];
            delete data["__v"];
            dispatch(setAnotherProfileInfoAC(data));
            dispatch(setProfileStatusAC("succeeded"));
        })
        .catch((e) => {
            dispatch(setProfileStatusAC("failed"));
        });
};

const savePhotoAC = (photoUrl: any) => ({
    type: "SAVE-PHOTO",
    photoUrl,
});

const saveBackgroundAC = (url: string) => ({
    type: "SAVE-BACKGROUND",
    url,
});

export const savePhotoTC = (file: File) => async (dispatch: AppDispatchType) => {
    await profileAPI.saveProfilePhoto(file).then((res) => dispatch(savePhotoAC(res.data.path)));
};

export const changeBackgroundTC = (url: string) => async (dispatch: AppDispatchType) => {
    await profileAPI.changeBackground(url).then((res) => dispatch(saveBackgroundAC(res.data.image)));
};

export const editProfileTC = (payload: any) => async (dispatch: AppDispatchType) => {
    dispatch(setProfileEditStatusAC("loading"));
    await profileAPI
        .editProfile(payload)
        .then((res) => {    //@ts-ignore

            dispatch(getProfileTC(res.data.user_id));
            dispatch(setProfileEditStatusAC("succeeded"));
        })
        .catch((e) => dispatch(setProfileEditStatusAC("failed")));
};
