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
    async liked(payload:any) {
        return instance.post(baseUrl("/posts/liked"), await expandHeaders(), payload);
    }

   
};