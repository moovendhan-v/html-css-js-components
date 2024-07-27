import { useComponentsStore } from '@/store/store';
import { ComponentData } from '@/types/ComponentData.type';
import api from '@/api'; // Import the axios instance

type ResponseItem = {
    post_details: ComponentData;
};

export const useFetchComponentStore = async (categories: string) => {
    try {
        const response = await api.get('/components/latest', {
            params: { category: categories }
        });
        
        const { response: responseData } = response.data;

        // Extract post_details from response
        const details: ComponentData[] = responseData.map((item: ResponseItem) => item.post_details);

        // Update the store
        useComponentsStore.setState({ [categories]: details });

        return details;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};
