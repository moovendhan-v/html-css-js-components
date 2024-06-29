import axios from 'axios';
import { useViewComponentStore } from '@/store/store';
import { getEnvVariable } from '@/utils/load.utils';
import Cookies from 'js-cookie';

export const fetchComponentStore = async (categorie: string , title: string) => {
    const baseUri = getEnvVariable('BASE_URI');
    const authToken = Cookies.get('authToken'); // Assumes js-cookie is used to manage cookies

    try {
        const response = await axios.get(`${baseUri}/components/${categorie}/${title}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                withCredentials: true,
            }
        });

        if (response.status !== 200) {
            throw new Error('Failed to fetch categorie');
        }

        const responseData = response.data;
        const postDetails = responseData.response.post_details;

        useViewComponentStore.setState({ viewComponents: postDetails });

        return postDetails;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};
