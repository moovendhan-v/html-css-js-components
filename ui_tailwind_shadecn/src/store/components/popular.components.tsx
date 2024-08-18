import create from 'zustand';
import { fetchPopularComponents } from '@/api/components/popularcomponents'; // Adjust import path
import { ComponentData } from '@/types/ComponentData.type';

interface CreateComponentsStore {
  popularComponents: ComponentData[];
//   setPopularComponents: (components: ComponentData[]) => void;
  fetchPopularComponents: () => Promise<void>;
}

export const userPopularComponents = create<CreateComponentsStore>((set, get) => ({
  popularComponents: [],

  // Function to set popular components in the store
//   setPopularComponents: (newComponents: ComponentData[]) => set(() => ({
//     popularComponents: newComponents,
//   })),

  fetchPopularComponents: async () => {
    const { popularComponents } = get();
    if (popularComponents.length > 0) {
      return;
    }
    try {
      const components = await fetchPopularComponents();
      console.log(components)
    } catch (error) {
      console.error('Error fetching popular components:', error);
    }
  },
}));
