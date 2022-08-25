import { baseUrl, expandHeaders, instance } from "./api";

export const messagesAPI = {
    async getMessages() {
        return instance.get(baseUrl(`/messages/get`), await expandHeaders());
    },

   
};
