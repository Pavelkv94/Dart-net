import { postsAPI } from "../api/postsAPI";
import { AppDispatchType } from "./store";
import * as AppConstants from "./AppContants";
import { RequestStatus } from "./appReducer";

type ActionType = {
  type: string;
  payload: PaginatedPostsType | Array<PostType>;
};

// export type CommentType = {
//   user: string;
//   user_id: string;
//   userAvatar: string;
//   message: string;
//   created_at: string;
//   likes: Array<string>;
//   post_id: string | undefined;
//   comment_id?: string;
// };

export type PostType = {
  id: string;
  image_url: string;
  user_id: string;
  user: {
    photo: string;
    first_name: string;
    last_name: string;
  };
  createdAt: string;
  text: string;
  likes: Array<string>;
  comments: Array<CommentType>;
};

export type PaginatedPostsType = {
  items: Array<PostType>;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};
export type PostBodyType = {
  image_url: string;
  text: string;
};

export type CommentBodyType = {
  comment: string;
  post_id: string;
};

export type PlaceType = "myPosts" | "saved" | "allPosts" | "userPosts";

export enum LikeStatus {
  None = "None",
  Like = "Like",
  Dislike = "Dislike",
}
export enum LikeParentType {
  Post = "Post",
  Comment = "Comment",
}
export type LikePayloadType = {
  parent_id: string;
  parent_type: LikeParentType;
};

const initialState = {
  userPosts: { items: [] as Array<PostType>, totalCount: 0, pageSize: 0, currentPage: 0, totalPages: 0 } as PaginatedPostsType,
  savedPosts: { items: [] as Array<PostType>, totalCount: 0, pageSize: 0, currentPage: 0, totalPages: 0 } as PaginatedPostsType,
  allPosts: { items: [] as Array<PostType>, totalCount: 0, pageSize: 0, currentPage: 0, totalPages: 0 } as PaginatedPostsType,
  status: RequestStatus.IDLE,
};

export type InitialStateType = typeof initialState;

export function postsReducer(state: InitialStateType = initialState, action: ActionType): InitialStateType {
  switch (action.type) {
    // case "SET-APP-STATUS":
    //     return { ...state, status: action.status };
    case AppConstants.FETCH_USER_POSTS:
      return { ...state, userPosts: action.payload };
    case AppConstants.FETCH_ALL_POSTS:
      return { ...state, allPosts: action.payload };

    case "GET-SAVED-POSTS":
      return { ...state, savedPosts: action.payload.reverse() };
    default:
      return state;
  }
}

const getUserPostsAC = (payload: PaginatedPostsType) => ({
  type: AppConstants.FETCH_USER_POSTS,
  payload,
});

const getAllPostsAC = (payload: PaginatedPostsType) => ({
  type: AppConstants.FETCH_ALL_POSTS,
  payload,
});

const getSavedPostsAC = (payload: PaginatedPostsType) => ({
  type: "GET-SAVED-POSTS",
  payload,
});

export const getUserPostsTC = (user_id: string | undefined, pageNumber: string, pageSize: string) => async (dispatch: AppDispatchType) => {
  postsAPI.getUserPosts(user_id, pageNumber, pageSize).then((res) => {
    dispatch(getUserPostsAC(res.data));
  });
};

export const getAllPostsTC = (pageNumber: string, pageSize: string) => async (dispatch: AppDispatchType) => {
  postsAPI.getAllPosts(pageNumber, pageSize).then((res) => {
    dispatch(getAllPostsAC(res.data));
  });
};

export const getSavedPostsTC = (user_id: string | undefined) => async (dispatch: AppDispatchType) => {
  postsAPI.getSavedPosts(user_id).then((res) => {
    dispatch(getSavedPostsAC(res.data));
  });
};

export const createPostTC = (payload: PostBodyType, user_id: string) => async (dispatch: AppDispatchType) => {
  postsAPI.createPost(payload).then(() => dispatch(getUserPostsTC(user_id, "1", "10")));
};

export const createCommentTC = (payload: CommentBodyType, place: PlaceType, user_id?: string | undefined) => async (dispatch: AppDispatchType) => {
  postsAPI.createComment(payload).then(() => {
    // return dispatch(getAllPostsTC("1", "10"));
    switch (place) {
      case "allPosts":
        return dispatch(getAllPostsTC("1", "10"));
      case "userPosts":
        return dispatch(getUserPostsTC(user_id, "1", "10"));
      default:
        return dispatch(getAllPostsTC("1", "10"));
    }
  });
};

export const likePostOrCommentTC = (payload: LikePayloadType, place: PlaceType, user_id?: string | undefined) => async (dispatch: AppDispatchType) => {
  postsAPI.likePostOrComment(payload).then(() => {
    switch (place) {
      case "allPosts":
        return dispatch(getAllPostsTC("1", "10"));
      case "userPosts":
        return dispatch(getUserPostsTC(user_id, "1", "10"));
      default:
        return dispatch(getAllPostsTC("1", "10"));
    }
  });
};

export const likedPostTC = (payload: any, place: PlaceType, user?: string | undefined) => async (dispatch: AppDispatchType) => {
  postsAPI.likedPost(payload).then((res) => {
    switch (place) {
      case "allPosts":
        return dispatch(getUserPostsTC("all"));
      case "saved":
        return dispatch(getSavedPostsTC(payload.user_id));
      case "userPosts":
        return dispatch(getUserPostsTC(user));
      default:
        return dispatch(getUserPostsTC(payload.user_id));
    }
  });
};

export const unlikedPostTC = (payload: any, place: PlaceType, user?: string | undefined) => async (dispatch: AppDispatchType) => {
  postsAPI.unlikedPost(payload).then((res) => {
    switch (place) {
      case "allPosts":
        return dispatch(getUserPostsTC("all"));
      case "saved":
        return dispatch(getSavedPostsTC(payload.user_id));
      case "userPosts":
        return dispatch(getUserPostsTC(user));
      default:
        return dispatch(getUserPostsTC(payload.user_id));
    }
  });
};

export const likedCommentTC = (payload: any) => async (dispatch: AppDispatchType) => {
  postsAPI.likedComment(payload).then((res) => dispatch(getUserPostsTC(payload.user_id)));
};

export const deletePostTC = (post_id: string | undefined, user_id: string | undefined, place: PlaceType) => async (dispatch: AppDispatchType) => {
  postsAPI.deletePost(post_id).then((res) => {
    switch (place) {
      case "allPosts":
        return dispatch(getUserPostsTC("all"));
      case "saved":
        return dispatch(getSavedPostsTC(user_id));
      case "userPosts":
        return dispatch(getUserPostsTC(user_id));
      default:
        return dispatch(getUserPostsTC(user_id));
    }
  });
};
