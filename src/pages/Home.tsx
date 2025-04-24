import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const moveToCreatePlant = () => {
        navigate('/create-plant');
    };

    return (
        <div>
            <header>
                <h3>내 식물</h3>
                <button onClick={() => moveToCreatePlant()}>식물 추가</button>
            </header>
        </div>
    );
};

export default Home;
