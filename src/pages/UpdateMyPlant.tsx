import MyPlantForm from '@/features/myPlant/MyPlantForm';
import { deleteMyPlantImgInStorage, savePlantImage, updateMyPlant } from '@/lib/plant';
import { useAuthStore } from '@/stores/authStore';
import { usePlantStore } from '@/stores/plantStore';
import { Plant } from '@/types/plant';
import { useState } from 'react';

const UpdateMyPlant = () => {
    const user = useAuthStore(sate => sate.user);
    const selectedMyPlant = usePlantStore(state => state.selectedMyPlant);

    const [imgFile, setImgFile] = useState<File | null>(null);
    const [name, setName] = useState(selectedMyPlant?.name || '');
    const [nameEn, setNameEn] = useState(selectedMyPlant?.nameEn || '');

    const handleUpdateMyPlant = async () => {
        if (!name || !user) {
            return;
        }

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
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex flex-col p-5">
            <button onClick={handleUpdateMyPlant} className="self-end mb-6">
                저장하기
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
