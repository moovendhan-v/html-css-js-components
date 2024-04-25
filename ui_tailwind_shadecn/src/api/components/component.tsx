// http://localhost:4000/componentsbuttons/moovendhan_amazing_tooltip4


// import { useComponentsStore } from '@/store/store';
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
        
        // Extract post_details from response
        // const details: ComponentData[] = responseData.map((item: ResponseItem) => item.post_details);

        // Update the store
        // useComponentsStore.setState({ [categorie]: details });

        return postDetails;
    } catch (error) {
        console.error('Error fetching categories:', error);``
    }
};
