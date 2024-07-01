import create from 'zustand';
import { persist } from 'zustand/middleware';

interface Like {
    isLiked: boolean;
    likeCount: number;
}

interface Saved {
    isSaved: boolean;
    savedCount: number;
}

interface Views {
    count: number;
}

interface Comment {
    comment: string;
    user: string;
    avatar: string;
    date: string;
}

interface Comments {
    count: number;
    commentsList: Comment[];
}

interface Admin {
    _id: string;
    login: string;
    email: string;
    avatar_url: string;
    url: string;
    html_url: string;
    company: string;
    location: string;
    name: string;
    blog: string;
    bio: string;
    twitter_username: string | null;
}

interface CreateComponents {
    html: string;
    css: string;
    javascript: string;
    categories: Array<string>;
    folder_path: string;
    folder_name: string;
    isActive: boolean;
    type: string;
    like: Like;
    saved: Saved;
    views: Views;
    title: string;
    description: string;
    comments: Comments;
    admin: Admin;
}

interface CreateComponentsStore {
    createComponents: CreateComponents;
    setCreateComponentField: <K extends keyof CreateComponents>(field: K, value: CreateComponents[K]) => void;
}

export const useCreateComponentsStore = create<CreateComponentsStore>()(
    persist(
        (set) => ({
            createComponents: {
                html: "",
                css: "",
                javascript: "",
                categories: [],
                folder_path: "",
                folder_name: "",
                isActive: false,
                type: "",
                like: {
                    isLiked: false,
                    likeCount: 0
                },
                saved: {
                    isSaved: false,
                    savedCount: 0
                },
                views: {
                    count: 0
                },
                title: "",
                description: "",
                comments: {
                    count: 0,
                    commentsList: [
                        {
                            comment: "",
                            user: "",
                            avatar: "",
                            date: ""
                        }
                    ]
                },
                admin: {
                    _id: "",
                    login: "",
                    email: "",
                    avatar_url: "",
                    url: "",
                    html_url: "",
                    company: "",
                    location: "",
                    name: "",
                    blog: "",
                    bio: "",
                    twitter_username: null,
                },
            },
            setCreateComponentField: (field, value) => set((state) => ({
                createComponents: {
                    ...state.createComponents,
                    [field]: value,
                }
            })),
        }),
        {
            name: 'create-new-component-store',
            getStorage: () => sessionStorage,
        }
    )
);
