import { baseUrl, expandHeaders, instance } from "./api";

export const authAPI = {
    
    async login(payload: any) {
        return instance.post(baseUrl("/auth/login"), {}, payload);
    },
    async registration(payload: any) {
        return instance.post(baseUrl("/auth/registration"), {}, payload);
    },
    async me(user_id: string | null) {
        return instance.get(baseUrl(`/auth/me/${user_id}`), await expandHeaders());
    },
    async getPhoto(user_id:string) {
        return instance.get(baseUrl(`/auth/getPhoto/${user_id}`), await expandHeaders());
    }
};