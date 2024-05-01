import { useCategoriesStore } from '@/store/store';

export const fetchCategories = async () => {
    try {
        const categories = useCategoriesStore.getState().categories;

        // If categories are already populated, return them
        if (categories.length > 0) {
            return categories;
        }

        const response = await fetch('http://localhost:4000/components/get-cateogries');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const { directories } = data;

        // Add categories to the store
        useCategoriesStore.getState().addCategories(directories);

        return directories;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};
