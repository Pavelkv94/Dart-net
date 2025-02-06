import { baseUrl, expandHeaders, API } from "./api";

export const usersAPI = {
    async getUsers() {
        return API.get(baseUrl(`/users`), await expandHeaders());
    },
    async follow(payload:any) {
        return API.post(baseUrl(`/users/follow`), await expandHeaders(), payload);
    },
    async unfollow(payload:any) {
        return API.post(baseUrl(`/users/unfollow`), await expandHeaders(), payload);
    },
    async getUserProfile(user_id:string) {
        return API.get(baseUrl(`/users/${user_id}`), await expandHeaders());
    }
};