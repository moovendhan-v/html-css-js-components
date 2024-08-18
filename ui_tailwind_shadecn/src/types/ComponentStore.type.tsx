
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
    inputs: ComponentData[];
    models: ComponentData[];
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
    search: ComponentData[];
};

export type ProfileDetails = {
    isLoading: boolean | null;
    error: string | null;
    components: ComponentData[] | null;
    inReview: ComponentData[] | null;
    rejected: ComponentData[] | null;
    inDraft: ComponentData[] | null;
    liked: ComponentData[] | null;
    saved: ComponentData[] | null;
}

export type ComponentStore ={
    html: string;
    css : string;
    js : string;
}
 export type ViewComponentStore = {
    viewComponents : ComponentData;
 }