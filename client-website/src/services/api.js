import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const unwrapData = (response) => {
    const payload = response?.data;
    if (payload && typeof payload === 'object' && 'data' in payload) {
        return payload.data;
    }
    return payload;
};

const extractList = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload && Array.isArray(payload.data)) return payload.data;
    if (payload && payload.data && Array.isArray(payload.data.data)) return payload.data.data;
    return [];
};

export const getBlogs = async () => {
    const response = await api.get('/blogs');
    return extractList(unwrapData(response));
};

export const getSingleBlog = async (id) => {
    const response = await api.get(`/blogs/id/${id}`);
    return unwrapData(response);
};

export const getServices = async () => {
    const response = await api.get('/services');
    return extractList(unwrapData(response));
};

export const getIndustries = async () => {
    const response = await api.get('/industries');
    return extractList(unwrapData(response));
};

export const getReviews = async () => {
    const response = await api.get('/reviews');
    return extractList(unwrapData(response));
};

export default api;

