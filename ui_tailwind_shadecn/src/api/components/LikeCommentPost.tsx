import api from '@/api'; // Import your configured axios instance

interface LikeResponse {
    error: boolean;
    code: number;
    message: string;
    response: {
        _id: string;
        user_id: string;
        title: string;
        description: string;
        tags: string[];
        upload_time: string;
        updated_time: string;
        folder_path: string;
        folder_name: string;
        categories: string;
        isActive: boolean;
        likes: string[];
        saves: string[];
        comments: string[];
        __v: number;
    };
    count: number;
}

interface CommentResponse {
    error: boolean;
    code: number;
    message: string;
    response: {
        _id: string;
        comment: string;
        user_id: string;
        component_id: string;
        created_at: string;
        updated_at: string;
    };
}

interface SaveResponse {
    error: boolean;
    code: number;
    message: string;
    response: {
        _id: string;
        user_id: string;
        title: string;
        description: string;
        tags: string[];
        upload_time: string;
        updated_time: string;
        folder_path: string;
        folder_name: string;
        categories: string;
        isActive: boolean;
        likes: string[];
        saves: string[]; // Includes the array of user IDs who saved the component
        comments: string[];
        __v: number;
    };
    count: number;
}

export const giveLike = async (componentId: string) => {
    try {
        // Use axios to fetch the like data
        const response = await api.get<LikeResponse>(`/components/${componentId}/like`);
        
        if (!response.data.error) {
            // Extract the component data from the response
            const { response: componentData } = response.data;

            return componentData;
        } else {
            console.error('Failed to like component:', response.data.message);
            return null;
        }
    } catch (error) {
        console.error('Error liking component:', error);
        return null;
    }
};

export const giveDislike = async (componentId: string) => {
    try {
        const response = await api.post<LikeResponse>(`/components/${componentId}/removelike`);
        
        if (!response.data.error) {
            const { response: componentData } = response.data;
            return componentData;
        } else {
            console.error('Failed to dislike component:', response.data.message);
            return null;
        }
    } catch (error) {
        console.error('Error disliking component:', error);
        return null;
    }
};

export const saveComponent = async (componentId: string) => {
    try {
        const response = await api.post<SaveResponse>(`/components/${componentId}/save`);
        
        if (!response.data.error) {
            const { response: componentData } = response.data;
            return componentData;
        } else {
            console.error('Failed to save component:', response.data.message);
            return null;
        }
    } catch (error) {
        console.error('Error saving component:', error);
        return null;
    }
};

export const unsaveComponent = async (componentId: string) => {
    try {
        const response = await api.post<SaveResponse>(`/components/${componentId}/unsave`);
        
        if (!response.data.error) {
            const { response: componentData } = response.data;
            return componentData;
        } else {
            console.error('Failed to unsave component:', response.data.message);
            return null;
        }
    } catch (error) {
        console.error('Error unsaving component:', error);
        return null;
    }
};

export const addComment = async (componentId: string, comment: string) => {
    try {
        const response = await api.post<CommentResponse>(`/components/${componentId}/comment`, { comment });
        
        if (!response.data.error) {
            const { response: commentData } = response.data;
            return commentData;
        } else {
            console.error('Failed to add comment:', response.data.message);
            return null;
        }
    } catch (error) {
        console.error('Error adding comment:', error);
        return null;
    }
};  
