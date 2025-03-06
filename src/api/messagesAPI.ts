import { baseUrl, expandHeaders, API } from "./api";

export const messagesAPI = {
  async getMessages() {
    return API.get(baseUrl(`/messages`), await expandHeaders());
  },
};
