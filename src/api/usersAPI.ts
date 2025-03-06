import { ContactBodyType } from "../redux/usersReducer";
import { baseUrl, expandHeaders, API } from "./api";

export const usersAPI = {
  async getUsers() {
    return API.get(baseUrl(`/users`), await expandHeaders());
  },
  async setContactAction(payload: ContactBodyType) {
    return API.post(baseUrl(`/users/set-contact-action`), await expandHeaders(), payload);
  },

  async getUserProfile(user_id: string) {
    return API.get(baseUrl(`/users/${user_id}`), await expandHeaders());
  },
};
