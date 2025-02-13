import { API } from "./api";

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
    return API.get(`http://dataservice.accuweather.com/currentconditions/v1/${city_id}?apikey=${import.meta.env.VITE_WEATHER_API_KEY}&metric=true`);
  },
  async getNews(lang: string) {
    return API.get(`https://newsapi.org/v2/everything?q=tesla&from=${date}&language=${lang}&sortBy=publishedAt&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`);
  },
  async getCovidStats(country: string) {
    return API.get(`https://covid-193.p.rapidapi.com/statistics?country=${country}`, covidHeaders);
  },
};
