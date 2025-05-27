import { loadGardenPlants, loadDryPlants } from '@/lib/nongsaroPlant';
import { useGardenPlantStore } from '@/stores/gardenPlantStore';
import { DryPlant, GardenPlant } from '@/types/nongsaroPlant';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce, filter } from 'lodash';

const SearchPlant = () => {
    const navigate = useNavigate();
    const setGardenPlants = useGardenPlantStore(state => state.setGardenPlants);
    const gardenPlants = useGardenPlantStore(state => state.gardenPlants);
    const [keyword, setKeyword] = useState('');
    const [filteredPlants, setFilteredPlants] = useState<(GardenPlant | DryPlant)[]>([]);

    useEffect(() => {
        const fetchPlants = async () => {
            if (!gardenPlants || gardenPlants.length === 0) {
                const [gardenPlantsRes, dryPlantsRes] = await Promise.all([loadGardenPlants(), loadDryPlants()]);
                const sortedPlant = [...gardenPlantsRes, ...dryPlantsRes].sort((a, b) =>
                    a.cntntsSj.localeCompare(b.cntntsSj)
                );
                setGardenPlants(sortedPlant);
            }
        };
        fetchPlants();
    }, []);

    const gardenPlantFilter = useCallback(
        debounce((text: string) => {
            if (!text.trim()) {
                return;
            }
            const filteredPlants = gardenPlants?.filter(gardenPlant => {
                return gardenPlant.cntntsSj.includes(text);
            });
            setFilteredPlants(filteredPlants || []);
        }, 300),
        [gardenPlants]
    );

    useEffect(() => {
        return () => {
            gardenPlantFilter.cancel();
        };
    }, [gardenPlantFilter]);

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
            {(keyword ? filteredPlants : gardenPlants)?.map(item => {
                return <p key={item.cntntsNo}>{item.cntntsSj}</p>;
            })}
        </div>
    );
};

export default SearchPlant;
