import LoginButton from '@/features/auth/LoginButton';

const Login = () => {
    return (
        <div>
            <h1>MyPlantPal</h1>
            <LoginButton provider="kakao" />
        </div>
    );
};

export default Login;
