import { baseUrl, expandHeaders, API } from "./api";

export const postsAPI = {
    async createPost(payload: any) {
        return API.post(baseUrl("/posts/create"), await expandHeaders(), payload);
    },
    async getPosts(user_id: string | undefined) {
        return API.get(baseUrl(`/posts/getPosts/${user_id}`), await expandHeaders());
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
