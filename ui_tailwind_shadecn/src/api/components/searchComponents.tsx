import api from '@/api';
import { useComponentsStore } from '@/store/store';
import { ComponentData } from '@/types/ComponentData.type';
import { getEnvVariable } from '@/utils/load.utils';

type ResponseItem = {
    post_details: ComponentData;
};

type ApiResponse = {
    response: ResponseItem[];
};

export const fetchComponentsBySearch = async (query: string | null) => {
    if (!query) {
        console.error('Query is null or undefined.');
        return;
    }

    const baseUri = getEnvVariable('BASE_URI');
    try {
        // Use api.get with query parameters
        const response = await api.get<ApiResponse>(`${baseUri}/components/searchcomponents`, {
            params: {
                search: query
            }
        });

        if (response.status !== 200) {
            throw new Error('Failed to fetch categories');
        }

        const { response: responseData } = response.data;

        // Extract post_details from response
        const details: ComponentData[] = responseData.map((item: ResponseItem) => item.post_details);

        // Update the store
        useComponentsStore.setState({ search: details });

        return details;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};
