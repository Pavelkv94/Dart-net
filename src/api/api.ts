import axios from "axios";

export const expandHeaders = async () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const baseUrl = (url: string) => `${process.env.REACT_APP_HOST}${url}`;

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
    //todo Profile
    async getProfileInfo(user_id:string) {
        return instance.get(baseUrl(`/profile/${user_id}`), await expandHeaders());
    },
    // async createCategory(title: any) {
    //     return instance.post(baseUrl("/categories"), await expandHeaders(), {
    //         title: title,
    //     });
    // },
    // async getCategories() {
    //     return instance.get(baseUrl("/categories"), await expandHeaders());
    // },
    // async createPost(title: string, category: string, text: string) {
    //     return instance.post(baseUrl("/posts"), await expandHeaders(), {
    //         title,
    //         category,
    //         text,
    //     });
    // },
    // async editPost(title: string, category: string, text: string, id: string) {
    //     return instance.put(baseUrl(`/posts/${id}`), await expandHeaders(), {
    //         title,
    //         category,
    //         text,
    //     });
    // },
    // async deletePost(id: string) {
    //     return instance.delete(baseUrl(`/posts/${id}`), await expandHeaders());
    // },
    // async getPosts() {
    //     return instance.get(baseUrl("/posts"), await expandHeaders());
    // },
    // async getShortPosts() {
    //     return instance.get(baseUrl("/shortPosts"), await expandHeaders());
    // },
    // async getPost(id: string) {
    //     return instance.get(baseUrl(`/main/${id}`), await expandHeaders());
    // },
    // async addPostToCategory(post: string, category: string) {
    //     return instance.put(baseUrl("/categories"), await expandHeaders(), {
    //         newPost: post,
    //         category,
    //     });
    // },
    //todo AUTH
    async login(payload: any) {
        return instance.post(baseUrl("/auth/login"), {}, payload);
    },
    async registration(payload: any) {
        return instance.post(baseUrl("/auth/registration"), {}, payload);
    },
    async me(user_id: string | null) {
        return instance.get(baseUrl(`/auth/me/${user_id}`), await expandHeaders());
    },
};
