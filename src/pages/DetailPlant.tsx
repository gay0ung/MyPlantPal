import { loadNongsaroPlantDetail } from '@/lib/nongsaroPlant';
import { usePlantStore } from '@/stores/plantStore';
import { DryPlant, DryPlantDetail, GardenPlant, GardenPlantDetail, NongsaroPlantDetail } from '@/types/nongsaroPlant';
import { JSX, useEffect, useState } from 'react';

const DetailPlant = () => {
    const selectedNongsaroPlant = usePlantStore(state => state.selectedNongsaroPlant);
    const [plantDetail, setPlantDetail] = useState<NongsaroPlantDetail | null>(null);

    useEffect(() => {
        if (selectedNongsaroPlant) {
            const { cntntsNo, type } = selectedNongsaroPlant;
            loadNongsaroPlantDetail(cntntsNo, type).then(res => {
                console.log('res : ', res);
                console.log('selectedNongsaroPlant : ', selectedNongsaroPlant);
                setPlantDetail(res as NongsaroPlantDetail | null);
            });
        }
    }, [selectedNongsaroPlant]);

    const GardenPlantUI = (): JSX.Element => {
        const gardenPlant = selectedNongsaroPlant as GardenPlant;
        const gardenPlantDetail = plantDetail as GardenPlantDetail;

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
        const dryPlant = selectedNongsaroPlant as DryPlant;
        const dryPlantDetail = plantDetail as DryPlantDetail;

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
                {selectedNongsaroPlant?.type === 'dry' ? DryPlantUI() : GardenPlantUI()}
            </div>
        </div>
    );
};

export default DetailPlant;
