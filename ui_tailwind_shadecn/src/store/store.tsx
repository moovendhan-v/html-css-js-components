import { ComponentsStore, ViewComponentStore, } from '@/types/ComponentStore.type'
import { CategoriesStore } from '@/types/CategoriesStore.type'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { fetchCategories } from '@/api/components/categories'


// Create the store with zustand
export const useCategoriesStore = create<CategoriesStore>()(
    persist(
        (set, get) => ({
            categories: [],
            addCategories: (newCategories) => set((state) => ({
                categories: [...state.categories, ...newCategories],
            })),
            fetchCategoriesIfNeeded: async () => {
                const categories = get().categories;

                // If categories are already populated, return them
                if (categories.length === 0) {
                    await fetchCategories();
                }
                return get().categories;
            },
        }),
        {
            name: 'catogries-store',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ categories: state.categories }),
        }
    )
);

export const useComponentsStore = create<ComponentsStore>(() => ({
    all: [],
    navbar: [],
    buttons: [],
    carosel: [],
    hero_section: [],
    dropdown: [],
    testimonial: [],
    features: [],
    toggles: [],
    faq: [],
    forms: [],
    pricing: [],
    login_signup: [],
    accordian: [],
    cards: [],
    toggle: [],
    tabs: [],
    inputs: [],
    models: [],
    notification: [],
    loader: [],
    countdown: [],
    contactus: [],
    footer: [],
    tooltip: [],
    others: [],
    checkbox: [],
    gradient: [],
    toast: [],
    search: [],
}));

export const useViewComponentStore = create<ViewComponentStore>(() => ({
    viewComponents: {
        html: "",
        css: "",
        js: "",
        categories: "",
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
        isAdmin: false,
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
}));