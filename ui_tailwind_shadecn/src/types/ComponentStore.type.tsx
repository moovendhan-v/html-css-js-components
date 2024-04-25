
import {ComponentData} from '@/types/ComponentData.type'

export type ComponentsStore = {
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

export type ComponentStore ={
    html: string;
    css : string;
    js : string;
}
 export type ViewComponentStore = {
    viewComponents : ComponentData;
 }