import { NongsaroPlantSummary } from '@/types/nongsaroPlant';
import { Plant } from '@/types/plant';
import { create } from 'zustand';

interface Store {
    selectedMyPlant: Plant | null;
    nongsaroPlantSummaries: NongsaroPlantSummary[] | null;
    selectedNongsaroPlantSummary: NongsaroPlantSummary | null;
    setSelectedMyPlant: (myPlant: Plant | null) => void;
    setNongsaroPlantSummaries: (gardenPlants: NongsaroPlantSummary[] | null) => void;
    setSelectedNongsaroPlantSummary: (plant: NongsaroPlantSummary | null) => void;
}

export const usePlantStore = create<Store>(set => ({
    selectedMyPlant: null,
    nongsaroPlantSummaries: null,
    selectedNongsaroPlantSummary: null,

    setSelectedMyPlant: plant => set({ selectedMyPlant: plant }),
    setNongsaroPlantSummaries: plantSummaries => set({ nongsaroPlantSummaries: plantSummaries }),
    setSelectedNongsaroPlantSummary: plantSummary => set({ selectedNongsaroPlantSummary: plantSummary })
}));
