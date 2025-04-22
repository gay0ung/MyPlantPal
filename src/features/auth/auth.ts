import { supabase } from '@/supabaseClient';
import { SocialProvider } from '@/types/auth';

export const handleSocialLogin = (provider: SocialProvider) => {
    if (!provider) {
        return;
    }
    supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });
};
