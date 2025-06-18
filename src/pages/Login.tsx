import LoginButton from '@/features/auth/LoginButton';

const Login = () => {
    return (
        <div className="flex flex-col justify-center items-center h-full">
            <h1 className="mb-20 text-5xl">MyPlantPal</h1>
            <LoginButton provider="kakao" />
        </div>
    );
};

export default Login;
