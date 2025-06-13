import { useCallback, useMemo } from 'react';
import { savePlantData } from '@/lib/plant';
import { GardenPlant, GardenPlantSummary } from '@/types/nongsaroPlant';
import { User } from '@supabase/supabase-js';

import AddMyPlantButton from './AddMyPlantButton';
import PlantImage from './PlantImage';
import { useSnackbarStore } from '@/stores/snackbarStore';

interface DetailGardenPlantProps {
    user: User | null;
    plantSummary: GardenPlantSummary;
    plant: GardenPlant;
}

const DetailGardenPlant = ({ user, plantSummary, plant }: DetailGardenPlantProps) => {
    const snackBar = useSnackbarStore();
    const imageUrl = plantSummary?.rtnFileUrl.split('|')[0] || '';

    const requestAddPlantData = useMemo(
        () => ({
            name: plantSummary.cntntsSj,
            nameEn: plant?.plntbneNm || '',
            imgUrl: imageUrl
        }),
        [plantSummary, plant]
    );

    const handleAddGardenPlant = useCallback(async () => {
        if (!user) {
            return;
        }
        try {
            await savePlantData({ user, ...requestAddPlantData });
            snackBar.open('내 식물에 추가 하였습니다.', 'info');
        } catch (error) {
            snackBar.open('내 식물에 추가 되지 않았습니다. 다시 시도해 보세요', 'error', 4000);
        }
    }, [user, requestAddPlantData]);

    const getConvertedDPlantSpec = useMemo(() => {
        if (!plant?.speclmanageInfo) {
            return '-';
        }

        return plant.speclmanageInfo.replace(/-/g, '');
    }, [plant]);

    return (
        <div className="flex flex-col items-center gap-y-4">
            <AddMyPlantButton onClick={handleAddGardenPlant} />
            <PlantImage src={imageUrl} alt={`${plantSummary?.cntntsSj} 이미지`} />
            <div>
                <p>{plantSummary?.cntntsSj}</p>
                <p>{plant?.plntbneNm}</p>
                <div>
                    <b>특징</b>
                    <p>{getConvertedDPlantSpec}</p>
                </div>
                <div>
                    <b>원산지</b>
                    <p>{plant?.orgplceInfo || '-'}</p>
                </div>
                <div>
                    <h2>💡 관리 TIP</h2>
                    <div>
                        <b>물주기</b>
                        <ul>
                            <li>{`봄 : ${plant?.watercycleSprngCodeNm || '-'}`}</li>
                            <li>{`여름 : ${plant?.watercycleSummerCodeNm || '-'}`}</li>
                            <li>{`가을 : ${plant?.watercycleSprngCodeNm || '-'}`}</li>
                            <li>{`겨울 : ${plant?.watercycleWinterCodeNm || '-'}`}</li>
                        </ul>
                    </div>
                    <div>
                        <b>광도</b>
                        <p>{plant?.lighttdemanddoCodeNm}</p>
                    </div>
                    <div>
                        <b>생육온도</b>
                        <p>{plant?.grwhTpCodeNm || '-'}</p>
                    </div>
                    <div>
                        <b>최저온도</b>
                        <p>{plant?.winterLwetTpCodeNm || '-'}</p>
                    </div>
                    <div>
                        <b>배치장소</b>
                        <p>{plant?.postngplaceCodeNm || '-'}</p>
                    </div>
                    <div>
                        <b>병충해</b>
                        <p>{plant?.dlthtsCodeNm}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailGardenPlant;
