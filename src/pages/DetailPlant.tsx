import PlantImage from '@/features/plant/PlantImage';
import { loadNongsaroPlantDetail } from '@/lib/nongsaroPlant';
import { usePlantStore } from '@/stores/plantStore';
import { DryPlant, DryPlantSummary, GardenPlant, GardenPlantSummary, NongsaroPlant } from '@/types/nongsaroPlant';
import { useEffect, useState } from 'react';

const DetailPlant = () => {
    const selectedPlantSummary = usePlantStore(state => state.selectedNongsaroPlantSummary);
    const [plant, setPlant] = useState<NongsaroPlant | null>(null);

    useEffect(() => {
        if (selectedPlantSummary) {
            const { cntntsNo, type } = selectedPlantSummary;
            loadNongsaroPlantDetail(cntntsNo, type).then(res => {
                setPlant(res as NongsaroPlant | null);
            });
        }
    }, [selectedPlantSummary]);

    if (!selectedPlantSummary) {
        return <p>선택한 식물이 없습니다.</p>;
    }

    if (selectedPlantSummary.type === 'garden') {
        const gardenPlant = selectedPlantSummary as GardenPlantSummary;
        const gardenPlantDetail = plant as GardenPlant;
        const imageUrl = gardenPlant?.rtnFileUrl.split('|')[0] || '';

        return (
            <div className="flex flex-col items-center gap-y-4">
                <PlantImage src={imageUrl} alt={`${gardenPlant?.cntntsSj} 이미지`} />
                <p>{gardenPlant?.cntntsSj}</p>
                <p>{gardenPlantDetail?.plntbneNm}</p>
            </div>
        );
    }

    if (selectedPlantSummary.type === 'dry') {
        const dryPlant = selectedPlantSummary as DryPlantSummary;
        const dryPlantDetail = plant as DryPlant;
        const imageUrl = dryPlant.imgUrl1 || dryPlant.imgUrl2 || '';
        const plantEnName =
            dryPlantDetail?.scnm
                .replace(/<.*?>/g, '')
                .replace(/\s*,\s*[가-힣]+.*/g, '')
                .trim() || '';

        return (
            <div className="flex flex-col items-center gap-y-4">
                <PlantImage src={imageUrl} alt={`${dryPlant?.cntntsSj} 이미지`} />
                <p>{dryPlant?.cntntsSj}</p>
                <p>{plantEnName}</p>
            </div>
        );
    }

    return <p>선택한 식물정보를 불러 올 수 없습니다.</p>;
};

export default DetailPlant;
