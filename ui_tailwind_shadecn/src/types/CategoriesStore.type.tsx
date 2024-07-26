export interface CategoriesStore {
    categories: string[]; // Or whatever type your categories are
    addCategories: (categories: string[]) => void;
    fetchCategoriesIfNeeded: () => Promise<string[]>; 
  }