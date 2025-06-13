import { create } from 'zustand';

type SnackbarType = 'info' | 'error';

interface Snackbar {
    isOpen: boolean;
    message: string;
    duration: number;
    open: (message: string, type: SnackbarType, duration?: number) => void;
    close: () => void;
    type: SnackbarType;
}

export const useSnackbarStore = create<Snackbar>(set => ({
    isOpen: false,
    message: '',
    duration: 3000,
    type: 'info',
    open: (message, type = 'info', duration = 3000) => set({ isOpen: true, message, duration, type }),
    close: () => set({ isOpen: false, message: '' })
}));
