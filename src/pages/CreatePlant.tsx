import { ChangeEvent, useEffect, useState } from 'react';

import TxtInput from '@/features/plant/TxtInput';
import { useAuthStore } from '@/stores/authStore';
import { savePlantData, savePlantImage } from '@/lib/plant';
import { useSnackbarStore } from '@/stores/snackbarStore';

const CreatePlant = () => {
    const user = useAuthStore(state => state.user);
    const { open, close } = useSnackbarStore();

    const [isAddingPlant, setIsAddingPlant] = useState(false);
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [previewImg, setPreviewImg] = useState('');
    const [name, setName] = useState('');
    const [nameEn, setNameEn] = useState('');

    const init = () => {
        setImgFile(null);
        setPreviewImg('');
        setName('');
        setNameEn('');
    };

    const handleUploadedImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target.files) {
            return;
        }

        const file = e.target.files[0];
        if (!file) {
            return;
        }
        setPreviewImg(URL.createObjectURL(file));
        setImgFile(file);
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
            open('식물이 추가 되었습니다.', 'info');
            init();
        } catch (error) {
            console.log(error);
            open('식물이 추가 되지 않았습니다. 다시 추가해 주세요.', 'error', 5000);
        }

        setIsAddingPlant(false);
    };

    useEffect(() => {
        return () => {
            close();
        };
    }, []);

    return (
        <div className="flex flex-col p-5">
            <button onClick={addPlant} className="self-end mb-6" disabled={!name || isAddingPlant}>
                {isAddingPlant ? '추가중...' : '추가하기'}
            </button>
            <div className="flex flex-col items-center gap-y-4">
                <div className="relative w-80 h-80 bg-stone-200">
                    {previewImg ? (
                        <img src={previewImg} alt="업로드한 이미지" className="w-full h-full object-cover" />
                    ) : (
                        <p className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            이미지 업로드
                        </p>
                    )}
                    <label
                        htmlFor="image"
                        className="absolute flex left-0 top-0 items-center justify-center w-full h-full bg-stone-50/60 opacity-0 cursor-pointer hover:opacity-100"
                    >
                        이미지 업로드
                    </label>
                    <input
                        type="file"
                        accept="image/"
                        id="image"
                        onChange={e => handleUploadedImage(e)}
                        className="hidden"
                    />
                </div>
                <TxtInput
                    placeholder="식물명을 한글로 입력해 주세요."
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TxtInput
                    placeholder="식물명을 영문으로 입력해 주세요"
                    value={nameEn}
                    onChange={e => setNameEn(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CreatePlant;
