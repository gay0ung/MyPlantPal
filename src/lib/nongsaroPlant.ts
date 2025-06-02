import { DryPlant, GardenPlant, NongsaroPlant, NongsaroPlantResponse, NonsaroPlantType } from '@/types/nongsaroPlant';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const DEV_BASE_URL = 'https://cors-anywhere.herokuapp.com';
const BASE_URL = 'http://api.nongsaro.go.kr/service';

export const loadGardenPlants = async (): Promise<GardenPlant[]> => {
    const xmlRes = await axios.get(`${DEV_BASE_URL}/${BASE_URL}/garden/gardenList`, {
        responseType: 'text',
        params: {
            apiKey: process.env.REACT_APP_NONGSARO_SERVICE_KEY,
            numOfRows: 500,
            pageNo: 1
        }
    });

    const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true
    });
    const json = parser.parse(xmlRes.data) as NongsaroPlantResponse;
    const plants = getConvertedPlants(json.response.body.items.item, 'garden') as GardenPlant[];

    return plants;
};

export const loadDryPlants = async (): Promise<DryPlant[]> => {
    const xmlRes = await axios.get(`${DEV_BASE_URL}/${BASE_URL}/dryGarden/dryGardenList`, {
        responseType: 'text',
        params: {
            apiKey: process.env.REACT_APP_NONGSARO_SERVICE_KEY,
            numOfRows: 500,
            pageNo: 1
        }
    });

    const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true
    });
    const json = parser.parse(xmlRes.data) as NongsaroPlantResponse;
    const plants = getConvertedPlants(json.response.body.items.item, 'dry') as DryPlant[];

    return plants;
};

const getConvertedPlants = (plants: NongsaroPlant[], type: NonsaroPlantType) => {
    if (!plants || plants.length <= 0) {
        return [];
    }
    return plants.map(plant => {
        return {
            ...plant,
            type
        };
    });
};
