import { loadGardenPlants } from '@/lib/gardenPlant';
import { useGardenPlantStore } from '@/stores/gardenPlantStore';
import { GardenPlant } from '@/types/gardenPlant';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const SearchPlant = () => {
    const navigate = useNavigate();
    const setGardenPlants = useGardenPlantStore(state => state.setGardenPlants);
    const gardenPlants = useGardenPlantStore(state => state.gardenPlants);
    const [keyword, setKeyword] = useState('');
    const [filteredPlants, setFilteredPlants] = useState<GardenPlant[]>([]);

    useEffect(() => {
        loadGardenPlants().then(res => {
            setGardenPlants(res);
        });
    }, []);

    const gardenPlantFilter = useMemo(() => {
        return debounce((text: string) => {
            if (!text.trim()) {
                return;
            }
            const filteredPlants = gardenPlants?.filter(gardenPlant => {
                return gardenPlant.cntntsSj.includes(text);
            });
            setFilteredPlants(filteredPlants || []);
        }, 300);
    }, [gardenPlants]);

    const handleSearchPlant = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
        gardenPlantFilter(e.target.value);
    };

    const moveToCreatePlant = () => {
        navigate('/create-plant');
    };
    return (
        <div>
            <input type="text" onChange={e => handleSearchPlant(e)} value={keyword} />
            <button onClick={moveToCreatePlant}>식물 직접 추가하기</button>
            {gardenPlants &&
                !keyword &&
                gardenPlants.map(item => {
                    return <p key={item.cntntsNo}>{item.cntntsSj}</p>;
                })}
            {keyword &&
                filteredPlants &&
                filteredPlants.map(plant => {
                    return <p key={plant.cntntsNo}>{plant.cntntsSj}</p>;
                })}
        </div>
    );
};

export default SearchPlant;
