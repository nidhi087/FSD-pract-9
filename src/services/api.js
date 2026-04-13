import axios from 'axios';

// Get token for authorized API calls
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

const API_URL = 'http://localhost:5000/api';

export const getProducts = () => {
    return axios.get(`${API_URL}/products`);
};

export const getProduct = (id) => {
    return axios.get(`${API_URL}/products/${id}`);
};
