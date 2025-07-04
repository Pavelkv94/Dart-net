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
    formData.append("file", photoFile);
    return API.post(baseUrl(`/users/uploadPhoto`), await expandHeadersForPhoto(), formData);
  },
  async changeBackground(backgroundFile: File) {
    const formData = new FormData();
    formData.append("file", backgroundFile);
    return API.post(baseUrl(`/users/uploadBackground`), await expandHeadersForPhoto(), formData);
  },
  async updateProfile(payload: object) {
    return API.put(baseUrl(`/users/edit`), await expandHeaders(), payload);
  },
};
