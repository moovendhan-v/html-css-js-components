import { useCategoriesStore } from '@/store/store';
import api from '@/api'; // Import the axios instance

export const fetchCategories = async () => {
    try {
        const categories = useCategoriesStore.getState().categories;

        // If categories are already populated, return them
        if (categories.length > 0) {
            return categories;
        }

        // Use axios to fetch the categories
        const response = await api.get('/components/get-cateogries');
        
        const { directories } = response.data;
        // alert(directories)

        // Add categories to the store
        useCategoriesStore.getState().addCategories(directories);

        return directories;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};
