import PlantImage from '@/features/plant/PlantImage';
import { usePlantStore } from '@/stores/plantStore';

const DetailMyPlant = () => {
    const plant = usePlantStore(state => state.selectedMyPlant);

    return (
        <div className="flex flex-col items-center gap-y-4">
            <PlantImage src={plant?.imgUrl || ''} alt={`${plant?.name} 이미지`} />
            <p>{plant?.name}</p>
            <p>{plant?.nameEn}</p>
        </div>
    );
};

export default DetailMyPlant;
