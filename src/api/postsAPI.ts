import { baseUrl, expandHeaders, instance } from "./api";

export const postsAPI = {
    async createPost(payload: any) {
        return instance.post(baseUrl("/posts/create"), await expandHeaders(), payload);
    },
    async getPosts(user_id: string | undefined) {
        return instance.get(baseUrl(`/posts/getPosts/${user_id}`), await expandHeaders());
    },
    async getSavedPosts(user_id: string | undefined) {
        return instance.get(baseUrl(`/posts/getsavedPosts/${user_id}`), await expandHeaders());
    },
    async createComment(payload: any) {
        return instance.put(baseUrl("/posts/addComment"), await expandHeaders(), payload);
    },
    async likedPost(payload: any) {
        return instance.post(baseUrl("/posts/liked"), await expandHeaders(), payload);
    },
    async likedComment(payload: any) {
        return instance.post(baseUrl("/posts/likedComment"), await expandHeaders(), payload);
    },
    async unlikedPost(payload: any) {
        return instance.post(baseUrl("/posts/unliked"), await expandHeaders(), payload);
    },
    async deletePost(post_id: string | undefined) {
        return instance.delete(baseUrl(`/posts/deletePost/${post_id}`), await expandHeaders());
    },
};
