import axios from 'axios';
import { ENVIRONMENT } from '../constants/enviroment';

const api = axios.create({
  baseURL: ENVIRONMENT.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api
