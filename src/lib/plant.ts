import { supabase } from '@/supabaseClient';
import { Plant } from '@/types/plant';
import { User } from '@supabase/supabase-js';
import { v4 as uuid } from 'uuid';
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
    const fileName = `${Date.now()}_${uuid()}`;

    console.log(fileName);

    const { error } = await supabase.storage.from('plants').upload(fileName, file);

    if (error) {
        console.log('이미지 업로드 실패', error);
    }

    const { data: urlData } = supabase.storage.from('plants').getPublicUrl(fileName);
    return urlData.publicUrl;
};

export const savePlantData = async ({ user, name, nameEn, imgUrl }: InsertPlantDataParam): Promise<void> => {
    if (!user) {
        return;
    }
    const { error } = await supabase.from('plants').insert([{ name, nameEn, imgUrl, userId: user.id }]);
    if (error) {
        console.log('데이터 저장 실패', error);
    }
};

export const loadPlants = async (user: User | null): Promise<Plant[]> => {
    if (!user) {
        return [];
    }
    const userId = user.id;

    const { data: plants, error } = await supabase.from('plants').select('*').eq('userId', userId);

    if (error) {
        console.error('식물목록 로드 실패');
        return [];
    }
    return plants || [];
};

export const updateMyPlant = async (user: User | null, updatedData: Partial<Plant | null>) => {
    if (!user || !updatedData || !updatedData.id) {
        return;
    }

    await supabase.from('plants').update(updatedData).eq('id', updatedData.id).eq('userId', user.id);
};
