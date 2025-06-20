import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // ⛳️ CHANGE for production (e.g., Render URL)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
