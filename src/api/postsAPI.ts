import { baseUrl, expandHeaders, API } from "./api";
import { CommentBodyType, PostBodyType } from "../redux/postsReducer";
export const postsAPI = {
    async createPost(payload: PostBodyType) {
        return API.post(baseUrl("/posts"), await expandHeaders(), payload);
    },
    async getUserPosts(user_id: string | undefined, pageNumber: string = "1", pageSize: string = "10") {
        return API.get(baseUrl(`/posts/${user_id}?pageNumber=${pageNumber}&pageSize=${pageSize}`), await expandHeaders());
    },
    async getAllPosts(pageNumber: string = "1", pageSize: string = "10") {
        return API.get(baseUrl(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}`), await expandHeaders());
    },
    async createComment(payload: CommentBodyType) {
        return API.post(baseUrl("/comments"), await expandHeaders(), payload);
    },
    async deletePost(post_id: string | undefined) {
        return API.delete(baseUrl(`/posts/${post_id}`), await expandHeaders());
    },
    


    async getSavedPosts(user_id: string | undefined) {
        return API.get(baseUrl(`/posts/getsavedPosts/${user_id}`), await expandHeaders());
    },

    async likedPost(payload: any) {
        return API.post(baseUrl("/posts/liked"), await expandHeaders(), payload);
    },
    async likedComment(payload: any) {
        return API.post(baseUrl("/posts/likedComment"), await expandHeaders(), payload);
    },
    async unlikedPost(payload: any) {
        return API.post(baseUrl("/posts/unliked"), await expandHeaders(), payload);
    },

};
