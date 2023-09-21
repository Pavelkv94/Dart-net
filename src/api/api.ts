import axios from "axios";

export const expandHeaders = async () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const baseUrl = (url: string) => `${process.env.REACT_APP_HOST}${url}` || "https://dart-k3e2.onrender.com";

export const instance = {
    get: (url: string, headers: any = {}, params: any = {}) => {
        return axios.get(url, {
            headers,
            params,
        });
    },
    put(url: string, headers = {}, data = {}) {
        return axios.put(url, data, {
            headers,
        });
    },
    post(url: string, headers = {}, data = {}) {
        return axios.post(url, data, {
            headers,
        });
    },
    delete(url: string, headers = {}) {
        return axios.delete(url, {
            headers,
        });
    },
};

export const API = {
    async login(payload: any) {
        return instance.post(baseUrl("/auth/login"), {}, payload);
    },
    async registration(payload: any) {
        return instance.post(baseUrl("/auth/registration"), {}, payload);
    },
    async me(user_id: string | null) {
        return instance.get(baseUrl(`/auth/me/${user_id}`), await expandHeaders());
    },
    async getPhoto(user_id: string) {
        return instance.get(baseUrl(`/auth/getPhoto/${user_id}`), await expandHeaders());
    },
};
