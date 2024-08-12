import axios from 'axios';
import { useViewComponentStore } from '@/store/store';
import { getEnvVariable } from '@/utils/load.utils';
import Cookies from 'js-cookie';
// import { useAuth } from '@/components/AuthProvide';

export const fetchComponentStore = async (categorie: string , title: string) => {
    // const { token } = useAuth();
    const baseUri = getEnvVariable('BASE_URI');
    const authToken = Cookies.get('authToken');

    try {
        const response = await axios.get(`${baseUri}/components/${categorie}/${title}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        });

        if (response.status !== 200) {
            throw new Error('Failed to fetch categorie');
        }

        const responseData = response.data;
        const postDetails = responseData.response;
        console.log('postDetails', postDetails)

        useViewComponentStore.setState({ viewComponents: postDetails });

        return postDetails;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};



// import { useViewComponentStore } from '@/store/store';
// import api from '@/api';
// import { useAuth } from '@/components/AuthProvide';
// import { ComponentData } from '@/types/ComponentData.type';

// type ApiResponse = {
//     response: {
//         post_details: ComponentData;
//     };
// };

// export const fetchComponentStore = async (categorie: string, title: string) => {
//     const { token } = useAuth();

//     try {
//         const response = await api.get<ApiResponse>(`/components/${categorie}/${title}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         if (response.status !== 200) {
//             throw new Error('Failed to fetch category');
//         }

//         const { post_details } = response.data.response;

//         // Ensure post_details conforms to ComponentData[]
//         if (Array.isArray(post_details)) {
//             useViewComponentStore.setState({ viewComponents: post_details });
//         } else {
//             throw new Error('Unexpected data structure');
//         }

//         return post_details;
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//     }
// };
