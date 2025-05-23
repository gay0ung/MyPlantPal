import { SocialProvider } from '@/types/auth';
import { handleSocialLogin } from '../../lib/auth';

interface LoginButtonProps {
    provider: SocialProvider;
}

const label: Record<SocialProvider, string> = {
    kakao: '카카오로 로그인'
};

const LoginButton = ({ provider }: LoginButtonProps) => {
    return <button onClick={() => handleSocialLogin(provider)}>{label[provider]}</button>;
};

export default LoginButton;
