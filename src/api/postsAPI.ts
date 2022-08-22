import { baseUrl, expandHeaders, instance } from "./api";

export const postsAPI = {
    
    async createPost(payload: any) {
        return instance.post(baseUrl("/posts/create"), await expandHeaders(), payload);
    },
    async getMyPosts() {
        return instance.get(baseUrl("/posts/getMyPosts"), await expandHeaders());
    },
    async  createComment(payload: any) {
        return instance.put(baseUrl("/posts/addComment"), await expandHeaders(), payload);
    },
    async likedPost(payload:any) {
        return instance.post(baseUrl("/posts/liked"), await expandHeaders(), payload);
    },
    async likedComment(payload:any) {
        return instance.post(baseUrl("/posts/likedComment"), await expandHeaders(), payload);
    },
    async unlikedPost(payload:any) {
        return instance.post(baseUrl("/posts/unliked"), await expandHeaders(), payload);
    },

   
};