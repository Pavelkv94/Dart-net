import { baseUrl, expandHeaders, API } from "./api";

export type LoginPayloadType = {
  loginOrEmail: string;
  password: string;
};

export type RegistrationPayloadType = {
  login: string;
  email: string;
  password: string;
};

export const authAPI = {
  async login(payload: LoginPayloadType) {
    return API.post(baseUrl("/auth/login"), {}, payload);
  },
  async registration(payload: RegistrationPayloadType) {
    return API.post(baseUrl("/auth/registration"), {}, payload);
  },
  async me() {
    return API.get(baseUrl(`/auth/me`), await expandHeaders());
  },
  async getPhoto(user_id: string) {
    return API.get(baseUrl(`/auth/getPhoto/${user_id}`), await expandHeaders());
  },
  async logout() {
    return API.post(baseUrl(`/auth/logout`), await expandHeaders());
  },
};
