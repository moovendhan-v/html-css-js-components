import { useComponentsStore } from '@/store/store';
import { ComponentData } from '@/types/ComponentData.type';
import {getEnvVariable} from '@/utils/load.utils';

type ResponseItem = {
    post_details: ComponentData;
};

export const fetchComponentsBySearch = async (query: string | null) => {
    if (!query) {
        console.error('Query is null or undefined.');
        return;
    }
    const baseUri = getEnvVariable('BASE_URI');
    try {
        const response = await fetch(`${baseUri}/components/searchcomponents?search=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categorie');
        }
        const data = await response.json();
        const { response: responseData } = data;

        const details: ComponentData[] = responseData.map((item: ResponseItem) => item.post_details);
        
        useComponentsStore.setState({ search: details});

        return responseData;
    } catch (error) {
        console.error('Error fetching categories:', error);``
    }
};
