import { baseUrl, expandHeaders, API } from "./api";
import { PostBodyType } from "../redux/postsReducer";
export const postsAPI = {
    async createPost(payload: PostBodyType) {
        return API.post(baseUrl("/posts"), await expandHeaders(), payload);
    },
    async getUserPosts(user_id: string | undefined) {
        return API.get(baseUrl(`/posts/${user_id}`), await expandHeaders());
    },
    async getAllPosts() {
        return API.get(baseUrl(`/posts`), await expandHeaders());
    },


    
    async getSavedPosts(user_id: string | undefined) {
        return API.get(baseUrl(`/posts/getsavedPosts/${user_id}`), await expandHeaders());
    },
    async createComment(payload: any) {
        return API.put(baseUrl("/posts/addComment"), await expandHeaders(), payload);
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
    async deletePost(post_id: string | undefined) {
        return API.delete(baseUrl(`/posts/deletePost/${post_id}`), await expandHeaders());
    },
};
