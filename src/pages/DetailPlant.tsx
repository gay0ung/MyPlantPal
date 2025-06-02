import { loadNongsaroPlantDetail } from '@/lib/nongsaroPlant';
import { usePlantStore } from '@/stores/plantStore';
import { DryPlant, DryPlantSummary, GardenPlant, GardenPlantSummary, NongsaroPlant } from '@/types/nongsaroPlant';
import { JSX, useEffect, useState } from 'react';

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

    const GardenPlantUI = (): JSX.Element => {
        const gardenPlant = selectedPlantSummary as GardenPlantSummary;
        const gardenPlantDetail = plant as GardenPlant;

        const getPlantUrl = gardenPlant?.rtnFileUrl.split('|')[0] || '';

        return (
            <>
                <div className="relative w-80 h-80 bg-stone-200">
                    <img
                        src={getPlantUrl}
                        alt={`${gardenPlant?.cntntsSj} 이미지`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <p>{gardenPlant?.cntntsSj}</p>
                <p>{gardenPlantDetail?.plntbneNm}</p>
            </>
        );
    };

    const DryPlantUI = (): JSX.Element => {
        const dryPlant = selectedPlantSummary as DryPlantSummary;
        const dryPlantDetail = plant as DryPlant;

        const getPlantEnName = () => {
            return dryPlantDetail?.scnm
                .replace(/<.*?>/g, '')
                .replace(/\s*,\s*[가-힣]+.*/g, '')
                .trim();
        };

        return (
            <>
                <div className="relative w-80 h-80 bg-stone-200">
                    <img
                        src={dryPlant.imgUrl1 || dryPlant.imgUrl2}
                        alt={`${dryPlant?.cntntsSj} 이미지`}
                        className="w-full h-full object-cover"
                    />
                </div>
                <p>{dryPlant?.cntntsSj}</p>
                <p>{getPlantEnName()}</p>
            </>
        );
    };

    return (
        <div>
            <div className="flex flex-col items-center gap-y-4">
                {selectedPlantSummary?.type === 'dry' ? DryPlantUI() : GardenPlantUI()}
            </div>
        </div>
    );
};

export default DetailPlant;
