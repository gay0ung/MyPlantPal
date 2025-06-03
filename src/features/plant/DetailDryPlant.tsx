import { useCallback, useMemo } from 'react';
import { User } from '@supabase/supabase-js';
import { DryPlant, DryPlantSummary } from '@/types/nongsaroPlant';
import { savePlantData } from '@/lib/plant';

import AddMyPlantButton from './AddMyPlantButton';
import PlantImage from './PlantImage';

interface DetailDryPlantProps {
    user: User | null;
    plantSummary: DryPlantSummary;
    plant: DryPlant;
}

const DetailDryPlant = ({ user, plantSummary, plant }: DetailDryPlantProps) => {
    const imageUrl = plantSummary.imgUrl1 || plantSummary.imgUrl2 || '';
    const plantEnName =
        plant?.scnm
            .replace(/<.*?>/g, '')
            .replace(/\s*,\s*[가-힣]+.*/g, '')
            .trim() || '';

    const requestAddPlantData = useMemo(
        () => ({
            name: plantSummary.cntntsSj,
            nameEn: plantEnName,
            imgUrl: imageUrl
        }),
        [plantSummary, plant]
    );

    const handleAddDryPlant = useCallback(() => {
        if (!user) {
            return;
        }
        savePlantData({ user, ...requestAddPlantData });
    }, [user, requestAddPlantData]);

    return (
        <div className="flex flex-col items-center gap-y-4">
            <AddMyPlantButton onClick={handleAddDryPlant} />
            <PlantImage src={imageUrl} alt={`${plantSummary?.cntntsSj} 이미지`} />
            <p>{plantSummary?.cntntsSj}</p>
            <p>{plantEnName}</p>
        </div>
    );
};

export default DetailDryPlant;
