import { create } from 'zustand';
import {ComponentData} from '@/type/ComponentData.type'

type CategoriesStore = {
    categories: string[];
};

type ComponentsStore = {
    all: ComponentData[];
    navbar: ComponentData[]; 
    buttons: ComponentData[];
    carosel: ComponentData[];
    hero_section: ComponentData[];
    dropdown: ComponentData[];
    testimonial: ComponentData[];
    features: ComponentData[];
    toggles: ComponentData[];
    faq: ComponentData[];
    forms: ComponentData[];
    pricing: ComponentData[];
    login_signup: ComponentData[];
    accordian: ComponentData[];
    cards: ComponentData[];
    toggle: ComponentData[];
    tabs: ComponentData[];
    input: ComponentData[];
    modals: ComponentData[];
    notification: ComponentData[];
    loader: ComponentData[];
    countdown: ComponentData[];
    contactus: ComponentData[];
    footer: ComponentData[];
    tooltip: ComponentData[];
    others: ComponentData[];
    checkbox: ComponentData[];
    gradient: ComponentData[];
    toast: ComponentData[];
};


export const useCategoriesStore = create<CategoriesStore>(() => ({
    categories: [], 
}));

export const useComponentsStore = create<ComponentsStore>(() => ({
    all : [],
    navbar : [],
    buttons : [],
    carosel : [],
    hero_section : [],
    dropdown : [],
    testimonial : [],
    features : [],
    toggles : [],
    faq : [],
    forms : [],
    pricing : [],
    login_signup : [],
    accordian : [],
    cards : [],
    toggle : [],
    tabs : [],
    input : [],
    modals : [],
    notification : [],
    loader : [],
    countdown : [],
    contactus : [],
    footer : [],
    tooltip : [],
    others : [],
    checkbox : [],
    gradient : [],
    toast : [],
}));