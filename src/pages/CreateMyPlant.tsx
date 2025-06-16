import { useEffect, useState } from 'react';

import { useAuthStore } from '@/stores/authStore';
import { savePlantData, savePlantImage } from '@/lib/plant';
import { useSnackbarStore } from '@/stores/snackbarStore';
import MyPlantForm from '@/features/myPlant/MyPlantForm';

const CreateMyPlant = () => {
    const user = useAuthStore(state => state.user);
    const openSnackBar = useSnackbarStore(state => state.open);
    const closeSnackBar = useSnackbarStore(state => state.close);

    const [isAddingPlant, setIsAddingPlant] = useState(false);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [name, setName] = useState('');
    const [nameEn, setNameEn] = useState('');

    const init = () => {
        setImgFile(null);
        setName('');
        setNameEn('');
    };

    const addPlant = async () => {
        if (!name || !user) {
            return;
        }

        setIsAddingPlant(true);

        let imgUrl = '';

        try {
            if (imgFile) {
                imgUrl = await savePlantImage(user, imgFile);
            }

            await savePlantData({ user, name, nameEn, imgUrl });
            openSnackBar('식물이 추가 되었습니다.', 'info');
            init();
        } catch (error) {
            console.log(error);
            openSnackBar('식물이 추가 되지 않았습니다. 다시 추가해 주세요.', 'error', 5000);
        }

        setIsAddingPlant(false);
    };

    useEffect(() => {
        return () => {
            closeSnackBar();
        };
    }, []);

    return (
        <div className="flex flex-col p-5">
            <button onClick={addPlant} className="self-end mb-6" disabled={!name || isAddingPlant} type="button">
                {isAddingPlant ? '추가중...' : '추가하기'}
            </button>
            <MyPlantForm
                name={name}
                nameEn={nameEn}
                onNameChange={setName}
                onNameEnChange={setNameEn}
                onImgFileUpload={setImgFile}
            />
        </div>
    );
};

export default CreateMyPlant;
