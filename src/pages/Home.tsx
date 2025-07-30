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
        <div className="grid grid-rows-[var(--header-height)_1fr] h-full">
            <header className="flex justify-between items-center w-full h-[var(--header-height)] px-[4%] bg-white">
                <h3>내 식물</h3>
                <button className="btn-base" onClick={moveToSearchPlant}>
                    식물 추가
                </button>
            </header>
            <div className="overflow-y-auto custom-scroll flex justify-center h-full w-[99%] py-[40px] ">
                {plants.length <= 0 ? (
                    <p>등록된 식물이 없습니다.</p>
                ) : (
                    <ul className="flex flex-col gap-y-7 w-[80%] h-max">
                        {plants.map((plant, i) => {
                            return (
                                <li
                                    key={i}
                                    className="overflow-hidden rounded-3xl shadow-[2px_3px_3px_1px_rgba(0,0,0,0.1)]"
                                >
                                    <button className="flex w-full" onClick={() => handleMyPlant(plant)}>
                                        <img
                                            src={plant.imgUrl}
                                            alt={`${plant.name} 이미지`}
                                            className="md:w-80 md:h-80 w-28 h-28 rounded-3xl transition-[width,height] duration-300 ease-out"
                                        />
                                        <div className="flex-1 p-2 text-left">
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
