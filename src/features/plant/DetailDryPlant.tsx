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

    const getReplacedInfo = (info: string) => {
        if (!info) {
            return '-';
        }

        return info.replace(/<br\s*\/?>/gi, '. ').replace(/-/g, '');
    };

    return (
        <div className="flex flex-col items-center gap-y-4">
            <AddMyPlantButton onClick={handleAddDryPlant} />
            <PlantImage src={imageUrl} alt={`${plantSummary?.cntntsSj} 이미지`} />
            <p>{plantSummary?.cntntsSj}</p>
            <p>{plantEnName}</p>
            <div>
                <b>특징</b>
                <p>{getReplacedInfo(plant?.chartrInfo)}</p>
            </div>
            <div>
                <b>원산지</b>
                <p>{plant?.orgplce || '-'}</p>
            </div>
            <div>
                <h2>💡 관리 TIP</h2>
                <div>
                    <b>물주기</b>
                    <p>{getReplacedInfo(plant?.waterCycleInfo)}</p>
                </div>
                <div>
                    <b>광</b>
                    <p>{getReplacedInfo(plant?.lighttInfo)}</p>
                </div>
                <div>
                    <b>생장시기</b>
                    <p>{plant?.grwtInfo || '-'}</p>
                </div>
                <div>
                    <b>월동 온도</b>
                    <p>{plant?.pswntrTpInfo || '-'}</p>
                </div>
                <div>
                    <b>배치장소</b>
                    <p>{getReplacedInfo(plant?.batchPlaceInfo)}</p>
                </div>
                <div>
                    <b>병충해</b>
                    <p>{plant?.dlthtsInfo || '-'}</p>
                </div>
            </div>
        </div>
    );
};

export default DetailDryPlant;
