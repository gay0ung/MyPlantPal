import { loadGardenPlants } from '@/lib/gardenPlant';
import { useGardenPlantStore } from '@/stores/gardenPlantStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPlant = () => {
    const navigate = useNavigate();
    const setGardenPlants = useGardenPlantStore(state => state.setGardenPlants);
    const gardenPlants = useGardenPlantStore(state => state.gardenPlants);

    useEffect(() => {
        loadGardenPlants().then(res => {
            setGardenPlants(res);
        });
    }, []);

    const moveToCreatePlant = () => {
        navigate('/create-plant');
    };
    return (
        <div>
            <button onClick={moveToCreatePlant}>식물 직접 추가하기</button>
            {gardenPlants &&
                gardenPlants.map(item => {
                    return <p key={item.cntntsNo}>{item.cntntsSj}</p>;
                })}
        </div>
    );
};

export default SearchPlant;
