import { SocialProvider } from '@/types/auth';
import { handleSocialLogin } from '../../lib/auth';

interface LoginButtonProps {
    provider: SocialProvider;
}

const label: Record<SocialProvider, string> = {
    kakao: '카카오톡으로 로그인'
};

const LoginButton = ({ provider }: LoginButtonProps) => {
    return (
        <button
            className="h-14 px-16 rounded-xl bg-[#FAE202] text-xl font-medium"
            onClick={() => handleSocialLogin(provider)}
        >
            {label[provider]}
        </button>
    );
};

export default LoginButton;
