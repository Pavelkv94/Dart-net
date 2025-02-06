import { postsAPI } from "../api/postsAPI";
import { AppDispatchType } from "./store";
import { API } from "../api/api";
import { RequestStatus } from "./appReducer";

type ActionType = any;

export type CommentType = {
    user: string;
    user_id: string;
    userAvatar: string;
    message: string;
    created_at: string;
    likes: Array<string>;
    post_id: string | undefined;
    comment_id?: string;
};

export type PostType = {
    image: string;
    user: string;
    user_id: string;
    userAvatar: string;
    created_at?: string | Date;
    text: string;
    likes: Array<string>;
    comments: Array<CommentType>;
    _id?: string | undefined;
};

export type PlaceType = "myPosts" | "saved" | "allPosts" | "userPosts";

const initialState = {
    posts: [] as Array<PostType>,
    savedPosts: [] as Array<PostType>,
    status: RequestStatus.IDLE,
};

export type InitialStateType = typeof initialState;

export function postsReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        // case "SET-APP-STATUS":
        //     return { ...state, status: action.status };
        case "GET-POSTS":
            return { ...state, posts: action.payload.reverse() };
        case "GET-SAVED-POSTS":
            return { ...state, savedPosts: action.payload.reverse() };
        default:
            return state;
    }
}

const getPostsAC = (payload: any) => ({
    type: "GET-POSTS",
    payload,
});

const getSavedPostsAC = (payload: any) => ({
    type: "GET-SAVED-POSTS",
    payload,
});

export const getPostsTC = (user_id: string | undefined) => async (dispatch: AppDispatchType) => {
    postsAPI.getPosts(user_id).then((res) => {
        dispatch(getPostsAC(res.data));
    });
};

export const getSavedPostsTC = (user_id: string | undefined) => async (dispatch: AppDispatchType) => {
    postsAPI.getSavedPosts(user_id).then((res) => {
        dispatch(getSavedPostsAC(res.data));
    });
};

export const createPostTC = (payload: PostType) => async (dispatch: AppDispatchType) => {
    postsAPI.createPost(payload).then((res) => dispatch(getPostsTC(payload.user_id)));
};

export const sendCommentTC = (payload: any, place: PlaceType, user?: string | undefined) => async (dispatch: AppDispatchType) => {
    postsAPI.createComment(payload).then(() => {
        switch (place) {
            case "allPosts":
                return dispatch(getPostsTC("all"));
            case "saved":
                return dispatch(getSavedPostsTC(payload.user_id));
            case "userPosts":
                return dispatch(getPostsTC(user));
            default:
                return dispatch(getPostsTC(payload.user_id));
        }
    });
};

export const likedPostTC = (payload: any, place: PlaceType, user?: string | undefined) => async (dispatch: AppDispatchType) => {
    postsAPI.likedPost(payload).then((res) => {
        switch (place) {
            case "allPosts":
                return dispatch(getPostsTC("all"));
            case "saved":
                return dispatch(getSavedPostsTC(payload.user_id));
            case "userPosts":
                return dispatch(getPostsTC(user));
            default:
                return dispatch(getPostsTC(payload.user_id));
        }
    });
};

export const unlikedPostTC = (payload: any, place: PlaceType, user?: string | undefined) => async (dispatch: AppDispatchType) => {
    postsAPI.unlikedPost(payload).then((res) => {
        switch (place) {
            case "allPosts":
                return dispatch(getPostsTC("all"));
            case "saved":
                return dispatch(getSavedPostsTC(payload.user_id));
            case "userPosts":
                return dispatch(getPostsTC(user));
            default:
                return dispatch(getPostsTC(payload.user_id));
        }
    });
};

export const likedCommentTC = (payload: any) => async (dispatch: AppDispatchType) => {
    postsAPI.likedComment(payload).then((res) => dispatch(getPostsTC(payload.user_id)));
};

export const deletePostTC = (post_id:string | undefined, user_id: string | undefined, place: PlaceType) => async (dispatch: AppDispatchType) => {
    postsAPI.deletePost(post_id).then((res) => {
        switch (place) {
            case "allPosts":
                return dispatch(getPostsTC("all"));
            case "saved":
                return dispatch(getSavedPostsTC(user_id));
            case "userPosts":
                return dispatch(getPostsTC(user_id));
            default:
                return dispatch(getPostsTC(user_id));
        }
    })
}