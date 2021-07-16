import axios from "axios";

export const swapiApi = axios.create({
    baseURL: 'https://swapi.dev/api'
})