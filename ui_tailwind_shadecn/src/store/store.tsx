import { create } from 'zustand';

type CategoriesStore = {
    categories: string[];
};
type ComponentsStore = {
    all: object[];
    nav: object[]; 
    buttons: object[];
    carosel: object[];
    hero_section: object[];
    dropdown: object[];
    testimonial: object[];
    features: object[];
    toggles: object[];
    faq: object[];
    form: object[];
    pricing: object[];
    login_signup: object[];
    accordian: object[];
    card: object[];
    toggle: object[];
    tabs: object[];
    input: object[];
    modals: object[];
    notification: object[];
    loader: object[];
    countdown: object[];
    contactus: object[];
    footer: object[];
    tooltips: object[];
    others: object[];
}

export const useCategoriesStore = create<CategoriesStore>(() => ({
    categories: [], 
}));

export const useComponentsStore = create<ComponentsStore>(() => ({
    all : [],
    nav : [],
    buttons : [],
    carosel : [],
    hero_section : [],
    dropdown : [],
    testimonial : [],
    features : [],
    toggles : [],
    faq : [],
    form : [],
    pricing : [],
    login_signup : [],
    accordian : [],
    card : [],
    toggle : [],
    tabs : [],
    input : [],
    modals : [],
    notification : [],
    loader : [],
    countdown : [],
    contactus : [],
    footer : [],
    tooltips : [],
    others : [],
}));