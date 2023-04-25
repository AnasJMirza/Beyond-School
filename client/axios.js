import axios from 'axios';

const client = axios.create({
    baseURL: 'http://192.168.10.4:8000/api'
});


export default client;