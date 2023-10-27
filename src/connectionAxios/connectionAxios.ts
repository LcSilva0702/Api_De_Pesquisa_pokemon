import axios from "axios";

const connectionPokeApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2/"
});

export default connectionPokeApi;

