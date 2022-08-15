import { baseUrl, expandHeaders, instance } from "./api";

export const profileAPI = {
    async getProfileInfo(user_id:string) {
        return instance.get(baseUrl(`/profile/${user_id}`), await expandHeaders());
    },
    
};