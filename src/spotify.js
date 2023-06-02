import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";

const clientId = "0aa8ed0bfbdb4f928fedd9d50d76dcae";
const redirectUri = "http://localhost:3000/";
const scopes = ["user-library-read", "playlist-read-private","user-read-recently-played","user-library-modify","playlist-modify-public","playlist-modify-private"];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`;


const apiClient = axios.create({
  baseURL: "https://api.spotify.com"
});


export const setClienttoken =(token)=>{
  apiClient.interceptors.request.use(async (config)=>{
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  })
}

export default apiClient;
