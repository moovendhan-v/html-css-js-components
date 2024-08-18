import create from 'zustand';
import { fetchComponentsBySearch } from '@/api/components/componentStatus' // Adjust the path to your API
import { ComponentData } from '@/types/ComponentData.type';

interface CreateComponentsStore {
  componentsPending: ComponentData[];
  componentsInReview: ComponentData[];
  componentsRejected: ComponentData[];
  componentsDraft: ComponentData[];
  myComponents: ComponentData[];
  fetchComponentsByStatusIfNeeded: (status: string) => Promise<void>;
}

export const useCreateComponentsStore = create<CreateComponentsStore>((set, get) => ({
  componentsPending: [],
  myComponents: [],
  componentsInReview: [],
  componentsRejected: [],
  componentsDraft: [],

  // Fetch components based on the status and update the corresponding state
  fetchComponentsByStatusIfNeeded: async (status: string) => {
    try {
      const response = await fetchComponentsBySearch(status);
      if (response) {
        set((state) => {
          switch (status) {
            case 'my_components':
                return { componentsPending: response };
            case 'pending':
              return { componentsPending: response };
            case 'in_review':
              return { componentsInReview: response };
            case 'rejected':
              return { componentsRejected: response };
            case 'draft':
              return { componentsDraft: response };
            default:
              return state;
          }
        });
      }
    } catch (error) {
      console.error(`Failed to fetch components for status ${status}:`, error);
    }
  },
}));
