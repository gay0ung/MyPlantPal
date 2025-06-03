import { loadPlants } from '@/lib/plant';
import { useAuthStore } from '@/stores/authStore';
import { usePlantStore } from '@/stores/plantStore';
import { Plant } from '@/types/plant';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const user = useAuthStore(state => state.user);
    const setSelectedMyPlant = usePlantStore(state => state.setSelectedMyPlant);
    const navigate = useNavigate();

    const [plants, setPlants] = useState<Plant[]>([]);

    const moveToSearchPlant = () => {
        navigate('/search');
    };

    useEffect(() => {
        loadPlants(user).then(plants => {
            setPlants(plants);
        });
    }, []);

    const handleMyPlant = useCallback((myPlant: Plant) => {
        setSelectedMyPlant(myPlant);
        navigate(`/detail-my-plant/${myPlant.name}`);
    }, []);

    return (
        <div>
            <header>
                <h3>내 식물</h3>
                <button onClick={moveToSearchPlant}>식물 추가</button>
            </header>
            <div>
                {plants.length <= 0 ? (
                    <p>등록된 식물이 없습니다.</p>
                ) : (
                    <ul className="flex flex-col gap-y-7">
                        {plants.map((plant, i) => {
                            return (
                                <li key={i} className="flex">
                                    <button onClick={() => handleMyPlant(plant)}>
                                        <img
                                            sizes="300w"
                                            src={plant.imgUrl}
                                            alt={`${plant.name} 이미지`}
                                            className="w-1/3"
                                        />
                                        <div className="flex-1">
                                            <p>{plant.name}</p>
                                            <p>{plant.nameEn}</p>
                                        </div>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Home;
