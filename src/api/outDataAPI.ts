import { baseUrl, expandHeaders, instance } from "./api";

const APINEWS = "ab28e3c72ec04614a4b825cdfa8735e0";

const year = new Date().getFullYear();
const month = new Date().getMonth();
const day = new Date().getDate();

const date = `${year}-${month < 10 ? "0" + month : month}-${day < 10 ? "0" + day : day}`;

const covidHeaders = {
    "X-RapidAPI-Key": "08ad85e817mshd872ad73ef3f6cbp13a066jsnb9c555411331",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
};

export const outDataAPI = {
    async getWeather(city_id: string) {
        return instance.get(baseUrl(`/weather/${city_id}`), await expandHeaders());
    },
    async getNews(lang: string) {
        return instance.get(`https://newsapi.org/v2/everything?q=tesla&from=${date}&language=${lang}&sortBy=publishedAt&apiKey=${APINEWS}`);
    },
    async getCovidStats(country:string) {
        return instance.get(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, covidHeaders);
    },
};
