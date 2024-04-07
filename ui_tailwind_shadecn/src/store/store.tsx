import {create} from 'zustand';

type CounterStore = {
    count : number;
    incremnt: () => void;
    decrement: () => void;
}

export const useCounterStore = create<CounterStore>((set) => ({
    count: 0,
    incremnt: () => {
        set((state) => ({ count: state.count + 1 }));
    },
    decrement: () => {
        set((state) => ({ count: state.count - 1 }));
    },
}));
