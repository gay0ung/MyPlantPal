import { useCallback, useMemo } from 'react';
import { savePlantData } from '@/lib/plant';
import { GardenPlant, GardenPlantSummary } from '@/types/nongsaroPlant';
import { User } from '@supabase/supabase-js';

import AddMyPlantButton from './AddMyPlantButton';
import PlantImage from './PlantImage';

interface DetailGardenPlantProps {
    user: User | null;
    plantSummary: GardenPlantSummary;
    plant: GardenPlant;
}

const DetailGardenPlant = ({ user, plantSummary, plant }: DetailGardenPlantProps) => {
    const imageUrl = plantSummary?.rtnFileUrl.split('|')[0] || '';

    const requestAddPlantData = useMemo(
        () => ({
            name: plantSummary.cntntsSj,
            nameEn: plant?.plntbneNm || '',
            imgUrl: imageUrl
        }),
        [plantSummary, plant]
    );

    const handleAddGardenPlant = useCallback(() => {
        if (!user) {
            return;
        }
        savePlantData({ user, ...requestAddPlantData });
    }, [user, requestAddPlantData]);
    return (
        <div className="flex flex-col items-center gap-y-4">
            <AddMyPlantButton onClick={handleAddGardenPlant} />
            <PlantImage src={imageUrl} alt={`${plantSummary?.cntntsSj} 이미지`} />
            <p>{plantSummary?.cntntsSj}</p>
            <p>{plant?.plntbneNm}</p>
        </div>
    );
};

export default DetailGardenPlant;
