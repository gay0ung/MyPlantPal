import MyPlantForm from '@/features/myPlant/MyPlantForm';
import { deleteMyPlantImgInStorage, savePlantImage, updateMyPlant } from '@/lib/plant';
import { useAuthStore } from '@/stores/authStore';
import { usePlantStore } from '@/stores/plantStore';
import { useSnackbarStore } from '@/stores/snackbarStore';
import { Plant } from '@/types/plant';
import { useEffect, useMemo, useState } from 'react';

const UpdateMyPlant = () => {
    const user = useAuthStore(sate => sate.user);
    const selectedMyPlant = usePlantStore(state => state.selectedMyPlant);
    const setSelectedMyPlant = usePlantStore(state => state.setSelectedMyPlant);
    const openSnackBar = useSnackbarStore(state => state.open);
    const closeSnackBar = useSnackbarStore(state => state.close);

    const [isUpdatingMyPlant, setIsUpdatingMyPlant] = useState(false);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [name, setName] = useState(selectedMyPlant?.name || '');
    const [nameEn, setNameEn] = useState(selectedMyPlant?.nameEn || '');

    const handleUpdateMyPlant = async () => {
        if (!name || !user || !selectedMyPlant) {
            return;
        }

        setIsUpdatingMyPlant(true);

        let imgUrl = '';
        const requestData: Partial<Plant> = { id: selectedMyPlant?.id };

        if (selectedMyPlant?.name !== name) {
            requestData.name = name;
        }
        if (selectedMyPlant?.nameEn !== nameEn) {
            requestData.nameEn = nameEn;
        }

        try {
            if (imgFile) {
                imgUrl = await savePlantImage(user, imgFile);

                await deleteMyPlantImgInStorage(selectedMyPlant?.imgUrl || '');

                requestData.imgUrl = imgUrl;
            }
            await updateMyPlant(user, requestData);
            setSelectedMyPlant({ ...selectedMyPlant, ...requestData });
            openSnackBar('식물이 수정 되었습니다.', 'info');
        } catch (error) {
            console.log(error);
            openSnackBar('식물이 수정 되지 않았습니다.', 'error', 5000);
        }

        setIsUpdatingMyPlant(false);
    };

    const canUpdateMyPlant = useMemo(() => {
        if (!selectedMyPlant) {
            return false;
        }

        return (selectedMyPlant?.name !== name || imgFile || selectedMyPlant?.nameEn !== nameEn) && !isUpdatingMyPlant;
    }, [selectedMyPlant, name, imgFile, nameEn, isUpdatingMyPlant]);

    useEffect(() => {
        return () => {
            closeSnackBar();
        };
    }, []);

    return (
        <div className="flex flex-col p-5">
            <button
                onClick={handleUpdateMyPlant}
                className="self-end mb-6 disabled:bg-gray-400"
                disabled={!canUpdateMyPlant}
            >
                {isUpdatingMyPlant ? '저장중...' : '저장하기'}
            </button>
            <MyPlantForm
                name={name}
                nameEn={nameEn}
                imgUrl={selectedMyPlant?.imgUrl}
                onNameChange={setName}
                onNameEnChange={setNameEn}
                onImgFileUpload={setImgFile}
            />
        </div>
    );
};

export default UpdateMyPlant;
