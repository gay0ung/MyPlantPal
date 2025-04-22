import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';
import { supabase } from '@/supabaseClient';

const AuthCallback = () => {
    const navigate = useNavigate();
    const setUser = useAuthStore(state => state.setUser);

    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            const user = data.session?.user;
            if (user) {
                setUser(user);
                navigate('/home');
            } else {
                navigate('/');
            }
        });
    }, []);

    return <p>로그인 중입니다...</p>;
};

export default AuthCallback;
