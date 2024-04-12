import { create } from 'zustand';
import {ComponentsStore, } from '@/types/ComponentStore.type'
import {CategoriesStore} from '@/types/CategoriesStore.type'


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


// export const useComponentStore = create<ComponentStore>(()=>{
//     currentComponentStore : ComponentStore;
// })