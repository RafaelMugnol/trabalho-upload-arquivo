import axios from 'axios';

const api = axios.create({
  baseURL: 'https://3333-d0071a41-fceb-4767-9bc0-b4a9dfba6286.ws-us02.gitpod.io/',
   headers: {
       //admin:senhasecreta - base 64
      Authorization: 'Basic YWRtaW46c2VuaGFzZWNyZXRh'
  }
});

export default api;
