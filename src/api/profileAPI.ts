import { baseUrl, expandHeaders, instance } from "./api";
const expandHeadersForPhoto = async () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    'Content-Type': 'multipart/form-data'

});

export const profileAPI = {
    async getProfileInfo(user_id:string) {
        return instance.get(baseUrl(`/profile/user/${user_id}`), await expandHeaders());
    },
    async saveProfilePhoto(photoFile: File) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.post(baseUrl(`/profile/upload`),await expandHeadersForPhoto(), formData);
    },
    async getProfilePhoto() {
        return instance.get(baseUrl(`/profile/get`),await expandHeadersForPhoto());
    },
    
};