import { GardenPlant, GardenPlantResponse } from '@/types/gardenPlant';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export const loadGardenPlants = async (): Promise<GardenPlant[]> => {
    const xmlRes = await axios.get(
        `https://cors-anywhere.herokuapp.com/http://api.nongsaro.go.kr/service/garden/gardenList`,
        {
            responseType: 'text',
            params: {
                apiKey: process.env.REACT_APP_HOUSE_PLANT_KEY,
                numOfRows: 500,
                pageNo: 1
            }
        }
    );

    const parser = new XMLParser({
        ignoreAttributes: false,
        ignoreDeclaration: true
    });
    const json = parser.parse(xmlRes.data) as GardenPlantResponse;

    return json.response.body.items.item || [];
};
