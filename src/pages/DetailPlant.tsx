import { useEffect, useState } from 'react';
import { loadNongsaroPlantDetail } from '@/lib/nongsaroPlant';
import { useAuthStore } from '@/stores/authStore';
import { usePlantStore } from '@/stores/plantStore';
import { DryPlant, DryPlantSummary, GardenPlant, GardenPlantSummary, NongsaroPlant } from '@/types/nongsaroPlant';

import DetailDryPlant from '@/features/plant/DetailDryPlant';
import DetailGardenPlant from '@/features/plant/DetailGardenPlant';
import { useSnackbarStore } from '@/stores/snackbarStore';

const DetailPlant = () => {
    const user = useAuthStore(state => state.user);
    const selectedPlantSummary = usePlantStore(state => state.selectedNongsaroPlantSummary);
    const snackBar = useSnackbarStore();
    const [plant, setPlant] = useState<NongsaroPlant | null>(null);

    useEffect(() => {
        if (selectedPlantSummary) {
            const { cntntsNo, type } = selectedPlantSummary;
            loadNongsaroPlantDetail(cntntsNo, type).then(res => {
                setPlant(res as NongsaroPlant | null);
            });
        }

        return () => {
            snackBar.close();
        };
    }, [selectedPlantSummary?.cntntsNo]);

    if (!selectedPlantSummary) {
        return <p>선택한 식물이 없습니다.</p>;
    }

    if (selectedPlantSummary.type === 'garden') {
        return (
            <DetailGardenPlant
                user={user}
                plant={plant as GardenPlant}
                plantSummary={selectedPlantSummary as GardenPlantSummary}
            />
        );
    }

    if (selectedPlantSummary.type === 'dry') {
        return (
            <DetailDryPlant
                user={user}
                plantSummary={selectedPlantSummary as DryPlantSummary}
                plant={plant as DryPlant}
            />
        );
    }

    return <p>선택한 식물정보를 불러 올 수 없습니다.</p>;
};

export default DetailPlant;
