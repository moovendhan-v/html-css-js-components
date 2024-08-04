import { useLoginStore } from "@/store/Auth";
import api from '@/api';

export const HandleLogout = async () => {
    const response = await api.post('/auth/logout');
    console.log(response);
    useLoginStore.getState().logout();
    // alert("User Logged out");
};