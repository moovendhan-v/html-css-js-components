import api from '@/api';

export const fetchUserProfile = async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};

export const fetchUserSettings = async (userId: string) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
};