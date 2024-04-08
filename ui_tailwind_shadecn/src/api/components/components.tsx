import { useComponentsStore } from '@/store/store';

type PostDetails = {
    html: string;
    css: string;
    js: string;
    folder_path: string;
    folder_name: string;
    catogries: string;
    isActive: boolean;
    title: string;
    description: string;
    admin: {
        _id: string;
        id: number;
        login: string;
        avatar_url: string;
        url: string;
        html_url: string;
        company: string;
        location: string;
        email: string | null;
        name: string;
        blog: string;
        bio: string;
        twitter_username: string | null;
        __v: number;
    };
};

type ResponseItem = {
    post_details: PostDetails;
};

export const fetchComponentsStore = async (categories: string) => {
    try {
        const response = await fetch(`http://localhost:4000/components/searchcomponents?search=${categories}`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const { response: responseData } = data;

        // Extract post_details from response
        const details: PostDetails[] = responseData.map((item: ResponseItem) => item.post_details);

        // Update the store
        useComponentsStore.setState({ buttons: details });

        return details;
    } catch (error) {
        console.error('Error fetching categories:', error);``
    }
};
