import create from 'zustand';
import { persist } from 'zustand/middleware';

interface CreateComponents {
    html: string;
    css: string;
    javascript: string;
    categories: string;
    tags: string[];
    folder_path: string;
    folder_name: string;
    isActive: boolean;
    type: string;
    title: string;
    description: string;
}

interface CreateComponentsStore {
    createComponents: CreateComponents;
    setCreateComponentField: <K extends keyof CreateComponents>(field: K, value: CreateComponents[K]) => void;
    setTags: (tags: string) => void;
}

export const useCreateComponentsStore = create<CreateComponentsStore>()(
    persist(
        (set) => ({
            createComponents: {
                html: "",
                css: "",
                javascript: "",
                categories: "",
                tags: [],
                folder_path: "",
                folder_name: "",
                isActive: false,
                type: "",
                title: "",
                description: ""
            },
            setCreateComponentField: <K extends keyof CreateComponents>(field: K, value: CreateComponents[K]) => set((state) => {
                return {
                    createComponents: {
                        ...state.createComponents,
                        [field]: value,
                    }
                };
            }),
            setTags: (tag: string) => set((state) => {
                const existingTags = new Set(state.createComponents.tags);
                
                if (existingTags.has(tag)) {
                    // If the tag exists, remove it
                    existingTags.delete(tag);
                } else {
                    // If the tag does not exist, add it
                    existingTags.add(tag);
                }
            
                // Convert the Set back to an array
                const updatedTags = Array.from(existingTags);
            
                return {
                    createComponents: {
                        ...state.createComponents,
                        tags: updatedTags
                    }
                };
            }),
        }),
        {
            name: 'create-new-component-store',
            getStorage: () => sessionStorage,
        }
    )
);
