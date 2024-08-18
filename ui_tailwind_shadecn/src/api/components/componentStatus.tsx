import api from '@/api';
import { useCreateComponentsStore } from '@/store/components/view.components';
import { ComponentData } from '@/types/ComponentData.type';
import { getEnvVariable } from '@/utils/load.utils';

type ResponseItem = {
    post_details: ComponentData;
};


interface CreateComponentsStore {
    componentsPending: ComponentData[];
    componentsInReview: ComponentData[];
    componentsRejected: ComponentData[];
    componentsDraft: ComponentData[];
    myComponents: ComponentData[];
  }

type ApiResponse = {
    response: ResponseItem[];
};

const statusToStateKey: Record<string, keyof CreateComponentsStore> = {
    pending: 'componentsPending',
    in_review: 'componentsInReview',
    draft: 'componentsDraft',
    rejected: 'componentsRejected',
    published: 'myComponents',
};

export const fetchComponentsBySearch = async (status: string | null) => {
    if (!status || !statusToStateKey[status]) {
        console.error(`Invalid status: ${status}`);
        return;
    }

    const baseUri = getEnvVariable('BASE_URI');
    const stateKey = statusToStateKey[status];

    // Access the corresponding array from Zustand store dynamically
    const store = useCreateComponentsStore.getState();
    const currentComponents = store[stateKey] as ComponentData[];

    // Only fetch if the components array for this status is empty
    if (currentComponents.length === 0) {
        try {
            const response = await api.get<ApiResponse>(`${baseUri}/components/get-components-by-status?status=${status}`);
            if (response.status !== 200) {
                throw new Error(`Failed to fetch ${status} components`);
            }

            const { response: responseData } = response.data;
console.log(responseData)

            const details: ComponentData[] = responseData.map((item: ResponseItem) => item.post_details);
            console.log('details', details)


            // Dynamically update the Zustand store
            useCreateComponentsStore.setState({ [stateKey]: details });

            return details;
        } catch (error) {
            console.error(`Error fetching ${status} components:`, error);
        }
    }

    // Return existing components if already fetched
    return currentComponents;
};
