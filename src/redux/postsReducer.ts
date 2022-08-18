import { postsAPI } from './../api/postsAPI';
import { AppDispatchType } from "./store";
import { API } from "../api/api";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ActionType = any;

export type CommentType = {
    user: string;
    user_id: string
    userAvatar: string;
    message: string;
    created_at: string;
    likes: number;
    post_id: string | undefined;
};

export type PostType = {
    image: string;
    user: string;
    user_id: string
    userAvatar: string;
    created_at?: string | Date;
    text: string;
    likes: Array<string>
    comments: Array<CommentType>
    _id?: string | undefined
};

const initialState = {
    posts: [] as Array<PostType>, 
    myPosts: [] as Array<PostType>,
    status: "idle" as RequestStatusType,
};

export type InitialStateType = typeof initialState;

export function postsReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
    switch (action.type) {
        // case "SET-APP-STATUS":
        //     return { ...state, status: action.status };
        case "GET-MY-POSTS":
            return { ...state, myPosts: action.payload.reverse() };
        // case "SET-APP-ERR":
        //     return { ...state, error: action.err };
        // case "SET_ME":
        //     return {
        //         ...state,
        //         isAuth: true,
        //         user: {...action.payload, token: state.user.token, }
        //     };
        // case "LOGOUT":
        //     return { ...state, isAuth: false, user: {} };
        default:
            return state;
    }
}



const  getMyPostsAC = (payload: any) => ({
    type: "GET-MY-POSTS",
    payload
})


export const getMyPostsTC = () => async (dispatch: AppDispatchType) => {
    postsAPI.getMyPosts().then((res) => {
        dispatch(getMyPostsAC(res.data));
    })
}

export const createPostTC = (payload: PostType) => async (dispatch: AppDispatchType) => {
    postsAPI.createPost(payload).then((res) => dispatch(getMyPostsTC()))
}

export const sendCommentTC = (payload: any) => async (dispatch: AppDispatchType) => {
    postsAPI.createComment(payload).then(() => dispatch(getMyPostsTC()))
}

export const likedTC = (payload: any) => async (dispatch: AppDispatchType) => {
    postsAPI.liked(payload).then((res) => dispatch(getMyPostsTC()))
}

