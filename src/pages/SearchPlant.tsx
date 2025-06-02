import { loadGardenPlants, loadDryPlants } from '@/lib/nongsaroPlant';
import { usePlantStore } from '@/stores/plantStore';
import { DryPlant, GardenPlant } from '@/types/nongsaroPlant';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const SearchPlant = () => {
    const navigate = useNavigate();
    const nongsaroPlants = usePlantStore(state => state.nongsaroPlants);
    const setNongsaroPlants = usePlantStore(state => state.setNongsaroPlants);
    const [keyword, setKeyword] = useState('');
    const [filteredNongsaroPlants, setFilteredNongsaroPlants] = useState<(GardenPlant | DryPlant)[]>([]);

    useEffect(() => {
        const fetchPlants = async () => {
            if (!nongsaroPlants || nongsaroPlants.length === 0) {
                const [gardenPlantsRes, dryPlantsRes] = await Promise.all([loadGardenPlants(), loadDryPlants()]);
                const sortedPlant = [...gardenPlantsRes, ...dryPlantsRes].sort((a, b) =>
                    a.cntntsSj.localeCompare(b.cntntsSj)
                );
                setNongsaroPlants(sortedPlant);
            }
        };
        fetchPlants();
    }, []);

    const gardenPlantFilter = useCallback(
        debounce((text: string) => {
            if (!text.trim()) {
                return;
            }
            const filteredPlants = nongsaroPlants?.filter(nongsaroPlant => {
                return nongsaroPlant.cntntsSj.includes(text);
            });
            setFilteredNongsaroPlants(filteredPlants || []);
        }, 300),
        [nongsaroPlants]
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
            {(keyword ? filteredNongsaroPlants : nongsaroPlants)?.map(item => {
                return <p key={item.cntntsNo}>{item.cntntsSj}</p>;
            })}
        </div>
    );
};

export default SearchPlant;
