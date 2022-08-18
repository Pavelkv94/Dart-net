import { postsAPI } from './../api/postsAPI';
import { AppDispatchType } from "./store";
import { API } from "../api/api";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type ActionType = any;

type CommentType = {
    user: string;
    user_id: string
    userAvatar: string;
    message: string;
    created_at: string;
    likes: number;
};

export type PostType = {
    image: string;
    user: string;
    user_id: string
    userAvatar: string;
    created_at?: string | Date;
    text: string;
    likes: number
    comments: Array<CommentType>
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
            return { ...state, myPosts: action.payload };
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