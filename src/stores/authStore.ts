import { User } from '@supabase/supabase-js';
import { create } from 'zustand';

interface Store {
    user: User | null;
    isInitialized: boolean;
    setUser: (user: User | null) => void;
    logout: () => void;
    setIsInitialized: () => void;
}

export const useAuthStore = create<Store>(set => ({
    user: null,
    isInitialized: false,

    setUser: user => set({ user, isInitialized: true }),
    logout: () => set({ user: null, isInitialized: true }),
    setIsInitialized: () => set({ isInitialized: true })
}));
