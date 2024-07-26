// src/hooks/useCategories.js
import { useEffect } from 'react';
import { useCategoriesStore } from '@/store/store';

export const useCategories = () => {
    const categories = useCategoriesStore((state) => state.categories);
    const fetchCategoriesIfNeeded = useCategoriesStore((state) => state.fetchCategoriesIfNeeded);

    useEffect(() => {
        fetchCategoriesIfNeeded();
    }, [fetchCategoriesIfNeeded]);

    return categories;
};
