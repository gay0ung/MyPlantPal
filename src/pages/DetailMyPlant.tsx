import { useCallback, useEffect, useState } from 'react';
import PlantImage from '@/features/plant/PlantImage';
import { usePlantStore } from '@/stores/plantStore';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateTime } from 'luxon';
import { useAuthStore } from '@/stores/authStore';
import { deleteMyPlant, updateMyPlant } from '@/lib/plant';
import { useNavigate } from 'react-router-dom';

const DetailMyPlant = () => {
    const user = useAuthStore(state => state.user);
    const plant = usePlantStore(state => state.selectedMyPlant);
    const navigate = useNavigate();

    const [isShowDatePicker, setIsShowDatePicker] = useState<boolean>(false);
    const [selectedWateredAt, setSelectedWateredAt] = useState<Date | null>(null);

    useEffect(() => {
        const initSelectedWateredAt = plant?.wateredAt ? new Date(plant?.wateredAt) : null;
        setSelectedWateredAt(initSelectedWateredAt);
    }, [plant]);

    const handleDatePickerChange = useCallback(
        (date: Date | null) => {
            if (date && confirm(`물 준 날짜를 업데이트 하시겠습니까? \n📅 ${formattedDate(date)}`)) {
                setSelectedWateredAt(date);
                setIsShowDatePicker(false);
                updateMyPlant(user, { id: plant?.id, wateredAt: date });
            }
        },
        [selectedWateredAt]
    );

    const formattedDate = (date: Date) => {
        if (!date) {
            return '';
        }
        const dateTime = DateTime.fromJSDate(date);
        return dateTime.toFormat('yyyy년 MM월 dd일');
    };

    const handleDeleteMyPlant = () => {
        if (confirm('식물을 삭제 하시겠습니까?')) {
            deleteMyPlant(user, plant);
            navigate('/home');
        }
    };

    return (
        <div className="flex flex-col items-center gap-y-4">
            <PlantImage src={plant?.imgUrl || ''} alt={`${plant?.name} 이미지`} />
            <p>{plant?.name}</p>
            <p>{plant?.nameEn}</p>
            <div>
                <p>{`물 준 날짜 : ${selectedWateredAt ? formattedDate(selectedWateredAt) : '식물에게 물을 주세요 🪴'}`}</p>
            </div>
            <div>
                <button onClick={() => setIsShowDatePicker(!isShowDatePicker)}>물주기</button>
                {isShowDatePicker && (
                    <div>
                        <DatePicker
                            selected={selectedWateredAt}
                            inline
                            closeOnScroll={true}
                            onChange={e => handleDatePickerChange(e)}
                        />
                    </div>
                )}
            </div>
            <button type="button" onClick={handleDeleteMyPlant}>
                식물 삭제 하기
            </button>
        </div>
    );
};

export default DetailMyPlant;
