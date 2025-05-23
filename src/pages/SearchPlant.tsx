import { useNavigate } from 'react-router-dom';

const SearchPlant = () => {
    const navigate = useNavigate();

    const moveToCreatePlant = () => {
        navigate('/create-plant');
    };
    return (
        <div>
            <button onClick={moveToCreatePlant}>식물 직접 추가하기</button>
        </div>
    );
};

export default SearchPlant;
