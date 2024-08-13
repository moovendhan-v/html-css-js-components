import { useCreateComponentsStore } from '@/store/createComponents/create.components';
import api from '@/api'; // Import your axios instance
// import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

export interface ComponentData {
    title: string;
    description: string;
    tags?: string[];
    folder_name: string;
    categories: string;
    html: string;
    css: string;
    js: string;
}

export const postComponent = async (): Promise<void> => {
    // const navigate = useNavigate(); // Create navigate function
    console.log('Createing new component...');

    try {
        // Access component data from the store
        const { createComponents } = useCreateComponentsStore.getState();

        // Construct ComponentData object
        const componentData: ComponentData = {
            title: createComponents.title,
            description: createComponents.description,
            tags: createComponents.tags,
            folder_name: createComponents.folder_name,
            categories: createComponents.categories,
            html: createComponents.html,
            css: createComponents.css,
            js: createComponents.javascript // Use 'javascript' here based on your store setup
        };

        // Post the component data
        await api.post('/components/contribute-new-components', componentData);
        console.log('Component successfully submitted');

        // Clear the store state
        useCreateComponentsStore.setState({
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
            }
        });

        // Redirect to profile page
        // navigate('/profile'); // Replace '/profile' with the actual path of your profile page

    } catch (error) {
        console.error('Error contributing new component:', error);
    }
};
