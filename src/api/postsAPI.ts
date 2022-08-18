import { baseUrl, expandHeaders, instance } from "./api";

export const postsAPI = {
    
    async createPost(payload: any) {
        return instance.post(baseUrl("/posts/create"), await expandHeaders(), payload);
    },
    async getMyPosts() {
        return instance.get(baseUrl("/posts/getMyPosts"), await expandHeaders());
    }
   
};