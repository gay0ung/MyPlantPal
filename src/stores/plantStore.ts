import { NongsaroPlant, NongsaroPlantSummary } from '@/types/nongsaroPlant';
import { create } from 'zustand';

interface Store {
    nongsaroPlantSummaries: NongsaroPlantSummary[] | null;
    selectedNongsaroPlantSummary: NongsaroPlantSummary | null;
    setNongsaroPlantSummaries: (gardenPlants: NongsaroPlantSummary[] | null) => void;
    setSelectedNongsaroPlantSummary: (plant: NongsaroPlantSummary | null) => void;
}

export const usePlantStore = create<Store>(set => ({
    nongsaroPlantSummaries: null,
    selectedNongsaroPlantSummary: null,

    setNongsaroPlantSummaries: plantSummaries => set({ nongsaroPlantSummaries: plantSummaries }),
    setSelectedNongsaroPlantSummary: plantSummary => set({ selectedNongsaroPlantSummary: plantSummary })
}));
