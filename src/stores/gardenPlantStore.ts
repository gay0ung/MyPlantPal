import { DryPlant, GardenPlant, NongsaroPlant } from '@/types/nongsaroPlant';
import { create } from 'zustand';

interface Store {
    gardenPlants: NongsaroPlant[] | null;
    setGardenPlants: (gardenPlants: NongsaroPlant[] | null) => void;
}

export const useGardenPlantStore = create<Store>(set => ({
    gardenPlants: null,

    setGardenPlants: gardenPlants => set({ gardenPlants })
}));
