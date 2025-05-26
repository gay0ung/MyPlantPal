import { GardenPlant } from '@/types/gardenPlant';
import { create } from 'zustand';

interface Store {
    gardenPlants: GardenPlant[] | null;
    setGardenPlants: (gardenPlants: GardenPlant[] | null) => void;
}

export const useGardenPlantStore = create<Store>(set => ({
    gardenPlants: null,

    setGardenPlants: gardenPlants => set({ gardenPlants })
}));
