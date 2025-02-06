import { baseUrl, expandHeaders, instance } from "./api";

export const usersAPI = {
    async getUsers() {
        return instance.get(baseUrl(`/users`), await expandHeaders());
    },
    async follow(payload:any) {
        return instance.post(baseUrl(`/users/follow`), await expandHeaders(), payload);
    },
    async unfollow(payload:any) {
        return instance.post(baseUrl(`/users/unfollow`), await expandHeaders(), payload);
    },
    async getUserProfile(user_id:string) {
        return instance.get(baseUrl(`/users/${user_id}`), await expandHeaders());
    }
};