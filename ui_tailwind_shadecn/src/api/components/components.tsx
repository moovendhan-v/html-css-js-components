import { useComponentsStore } from '@/store/store';
import {ComponentData} from '@/types/ComponentData.type'
import {getEnvVariable} from '@/utils/load.utils';


type ResponseItem = {
    post_details: ComponentData;
};

export const fetchComponentsStore = async (categories: string) => {
    const baseUri = getEnvVariable('BASE_URI');
    try {
        const response = await fetch(`${baseUri}/components/latest?category=${categories}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const { response: responseData } = data;

        // Extract post_details from response
        const details: ComponentData[] = responseData.map((item: ResponseItem) => item.post_details);

        // Update the store
        useComponentsStore.setState({ [categories]: details });

        return details;
    } catch (error) {
        console.error('Error fetching categories:', error);``
    }
};
