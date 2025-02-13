import { baseUrl, expandHeaders, API } from "./api";
  const expandHeadersForPhoto = async () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "multipart/form-data",
  });

export const profileAPI = {
  async getProfileInfo(user_id: string) {
    return API.get(baseUrl(`/users/${user_id}`), await expandHeaders());
  },
  async saveProfilePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return API.post(baseUrl(`/users/uploadPhoto`), await expandHeadersForPhoto(), formData);
  },
  async changeBackground(url: string) {
    return API.put(baseUrl("/profile/changeBackground"), await expandHeadersForPhoto(), { url });
  },
  async updateProfile(payload: object) {
    return API.put(baseUrl(`/users/edit`), await expandHeaders(), payload);
  },
};
