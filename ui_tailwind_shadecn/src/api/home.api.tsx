import api from '@/api';

export const fetchCatogries = async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};
