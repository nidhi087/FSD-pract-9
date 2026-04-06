import axios from 'axios';

const API_URL = 'https://fakestoreapi.com';

export const getProducts = () => {
    return axios.get(`${API_URL}/products`);
};

export const getProduct = (id) => {
    return axios.get(`${API_URL}/products/${id}`);
};
