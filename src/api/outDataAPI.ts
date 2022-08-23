

import { baseUrl, expandHeaders, instance } from "./api";

const APINEWS = 'ab28e3c72ec04614a4b825cdfa8735e0';

const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();

const date = `${year}-${month< 10 ? '0' + month : month}-${day < 10 ? '0'+day : day}`

export const outDataAPI = {
    async getWeather(city_id:string) {
        return instance.get(baseUrl(`/weather/${city_id}`), await expandHeaders());
    },
    async getNews() {
        return instance.get(`https://newsapi.org/v2/everything?q=tesla&from=${date}&sortBy=publishedAt&apiKey=${APINEWS}`);
    },
};
