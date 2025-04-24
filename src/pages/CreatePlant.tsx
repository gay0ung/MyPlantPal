import TxtInput from '@/features/plant/TxtInput';
import { ChangeEvent, useState } from 'react';

const CreatePlant = () => {
    const [previewImg, setPreviewImg] = useState('');

    const handleUploadedImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e || !e.target.files) {
            return;
        }
        const file = e.target.files[0];
        setPreviewImg(URL.createObjectURL(file));
        console.log(file);
    };

    return (
        <div className="flex flex-col p-5">
            <button className="self-end mb-6">추가하기</button>
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
                <TxtInput placeholder="식물명을 한글로 입력해 주세요." />
                <TxtInput placeholder="식물명을 영문으로 입력해 주세요" />
            </div>
        </div>
    );
};

export default CreatePlant;
