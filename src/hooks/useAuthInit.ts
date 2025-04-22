import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/supabaseClient';
import React, { useEffect } from 'react';

const useAuthInit = () => {
    const setUser = useAuthStore(state => state.setUser);
    const logout = useAuthStore(state => state.logout);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (data.session?.user) {
                setUser(data.session.user);
            } else {
                logout();
            }
        });

        const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
            if (session?.user) {
                setUser(session.user);
            } else {
                logout();
            }
        });

        return () => {
            listener?.subscription.unsubscribe();
        };
    }, []);
};

export default useAuthInit;
