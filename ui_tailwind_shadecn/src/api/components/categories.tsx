import {useCategoriesStore} from '@/store/store';


export const fetchCategories = async () => {
    try {
        const response = await fetch('http://localhost:4000/components/get-cateogries');
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        const { directories } = data;
        useCategoriesStore.setState({ categories: directories }); // Use setState to update store
        return directories;
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

