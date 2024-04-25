// http://localhost:4000/componentsbuttons/moovendhan_amazing_tooltip4


import { useViewComponentStore } from '@/store/store';
// import {ComponentData} from '@/types/ComponentData.type'
import {getEnvVariable} from '@/utils/load.utils';


// type ResponseItem = {
//     post_details: ComponentData;
// };

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
