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

const SUPABASE_TABLE_PLANTS = 'plants';
const SUPABASE_BUCKET_PLANTS = 'plants';

export const savePlantImage = async (user: User, file: File): Promise<string> => {
    if (!user || !file) {
        return '';
    }
    const fileName = `${Date.now()}_${uuid()}`;

    const { error } = await supabase.storage.from(SUPABASE_BUCKET_PLANTS).upload(fileName, file);

    if (error) {
        console.log('이미지 업로드 실패', error);
    }

    const { data: urlData } = supabase.storage.from(SUPABASE_BUCKET_PLANTS).getPublicUrl(fileName);
    return urlData.publicUrl;
};

export const savePlantData = async ({ user, name, nameEn, imgUrl }: InsertPlantDataParam): Promise<void> => {
    if (!user) {
        return;
    }
    const { error } = await supabase.from(SUPABASE_TABLE_PLANTS).insert([{ name, nameEn, imgUrl, userId: user.id }]);
    if (error) {
        console.log('데이터 저장 실패', error);
    }
};

export const loadPlants = async (user: User | null): Promise<Plant[]> => {
    if (!user) {
        return [];
    }
    const userId = user.id;

    const { data: plants, error } = await supabase.from(SUPABASE_TABLE_PLANTS).select('*').eq('userId', userId);

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

    await supabase.from(SUPABASE_TABLE_PLANTS).update(updatedData).eq('id', updatedData.id).eq('userId', user.id);
};

export const deleteMyPlant = async (user: User | null, plant: Plant | null) => {
    if (!user || !plant) {
        return;
    }

    try {
        const { error: delError } = await supabase
            .from(SUPABASE_TABLE_PLANTS)
            .delete()
            .eq('id', plant.id)
            .eq('userId', user.id);
        if (delError) {
            return;
        }

        await deleteMyPlantImgInStorage(plant.imgUrl || '');
    } catch (error) {
        console.error('삭제 처리 중 에러 : ', error);
    }
};

const deleteMyPlantImgInStorage = async (imgUrl: string) => {
    const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';

    if (!imgUrl || !imgUrl.includes(SUPABASE_URL)) {
        return;
    }
    const filePath = imgUrl.split(`/${SUPABASE_BUCKET_PLANTS}/`)[1];
    await supabase.storage.from(SUPABASE_BUCKET_PLANTS).remove([filePath]);
};
