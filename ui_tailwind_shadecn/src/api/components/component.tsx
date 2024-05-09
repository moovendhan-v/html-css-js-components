
import { useViewComponentStore } from '@/store/store';
import {getEnvVariable} from '@/utils/load.utils';

export const fetchComponentStore = async (categorie: string , title: string) => {
    const baseUri = getEnvVariable('BASE_URI');
    try {
        const response = await fetch(`${baseUri}/components/${categorie}/${title}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categorie');
        }
        const responseData = await response.json();
        const postDetails = responseData.response.post_details; 
        
        useViewComponentStore.setState({viewComponents: postDetails});

        return postDetails;
    } catch (error) {
        console.error('Error fetching categories:', error);``
    }
};
