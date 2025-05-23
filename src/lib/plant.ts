import { supabase } from '@/supabaseClient';
import { User } from '@supabase/supabase-js';

interface InsertPlantDataParam {
    user: User;
    name: string;
    nameEn?: string;
    imgUrl?: string;
}

export const savePlantImage = async (user: User, file: File): Promise<string> => {
    if (!user || !file) {
        return '';
    }

    const encodedFileName = encodeURIComponent(file.name);
    const fileName = `${Date.now()}_${encodedFileName}`;

    console.log(fileName);

    const { error } = await supabase.storage.from('plants').upload(fileName, file);

    if (error) {
        console.log('이미지 업로드 실패', error);
    }

    const { data: urlData } = supabase.storage.from('plants').getPublicUrl(fileName);
    return urlData.publicUrl;
};

export const savePlantData = async ({ user, name, nameEn, imgUrl }: InsertPlantDataParam) => {
    if (!user) {
        console.log('유저 정보가 없음');

        return;
    }
    const { error } = await supabase.from('plants').insert([{ name, name_en: nameEn, img_url: imgUrl }]);
    if (error) {
        console.log('데이터 저장 실패', error);
    }
};
