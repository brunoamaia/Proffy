import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.107:3333'  // ip local que está sendo utilizado pelo pc
})

export default api;