import { loadGardenPlants, loadDryPlants } from '@/lib/nongsaroPlant';
import { usePlantStore } from '@/stores/plantStore';
import { DryPlant, GardenPlant, GardenPlantSummary, NongsaroPlant, NongsaroPlantSummary } from '@/types/nongsaroPlant';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const SearchPlant = () => {
    const navigate = useNavigate();

    const nongsaroPlantSummaries = usePlantStore(state => state.nongsaroPlantSummaries);
    const setNongsaroPlantSummaries = usePlantStore(state => state.setNongsaroPlantSummaries);
    const setSelectedNongsaroPlantSummary = usePlantStore(state => state.setSelectedNongsaroPlantSummary);

    const [keyword, setKeyword] = useState('');
    const [filteredNongsaroPlantSummaries, setFilteredNongsaroPlantSummaries] = useState<NongsaroPlantSummary[]>([]);

    useEffect(() => {
        const fetchPlants = async () => {
            if (!nongsaroPlantSummaries || nongsaroPlantSummaries.length === 0) {
                const [gardenPlantsRes, dryPlantsRes] = await Promise.all([loadGardenPlants(), loadDryPlants()]);
                const sortedPlant = [...gardenPlantsRes, ...dryPlantsRes].sort((a, b) =>
                    a.cntntsSj.localeCompare(b.cntntsSj)
                );
                setNongsaroPlantSummaries(sortedPlant);
            }
        };
        fetchPlants();
    }, []);

    const gardenPlantFilter = useCallback(
        debounce((text: string) => {
            if (!text.trim()) {
                return;
            }
            const filteredPlants = nongsaroPlantSummaries?.filter(nongsaroPlant => {
                return nongsaroPlant.cntntsSj.includes(text);
            });
            setFilteredNongsaroPlantSummaries(filteredPlants || []);
        }, 300),
        [nongsaroPlantSummaries]
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

    const selectNongsaroPlantSummary = (plant: NongsaroPlantSummary) => {
        setSelectedNongsaroPlantSummary(plant);
        navigate(`/detail-plant/${plant.cntntsNo}`);
    };

    return (
        <div>
            <input type="text" onChange={e => handleSearchPlant(e)} value={keyword} />
            <button onClick={moveToCreatePlant}>식물 직접 추가하기</button>
            {(keyword ? filteredNongsaroPlantSummaries : nongsaroPlantSummaries)?.map(item => {
                return (
                    <li key={item.cntntsNo}>
                        <button type="button" onClick={() => selectNongsaroPlantSummary(item)}>
                            <p>{item.cntntsSj}</p>
                        </button>
                    </li>
                );
            })}
        </div>
    );
};

export default SearchPlant;
