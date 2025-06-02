import { NongsaroPlant } from '@/types/nongsaroPlant';
import { create } from 'zustand';

interface Store {
    nongsaroPlants: NongsaroPlant[] | null;
    selectedNongsaroPlant: NongsaroPlant | null;
    setNongsaroPlants: (gardenPlants: NongsaroPlant[] | null) => void;
    setSelectedNongsaroPlant: (plant: NongsaroPlant | null) => void;
}

export const usePlantStore = create<Store>(set => ({
    nongsaroPlants: null,
    selectedNongsaroPlant: null,

    setNongsaroPlants: nongsaroPlants => set({ nongsaroPlants }),
    setSelectedNongsaroPlant: nongsaroPlant => set({ selectedNongsaroPlant: nongsaroPlant })
}));
