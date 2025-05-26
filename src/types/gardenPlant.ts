export interface GardenPlantResponse {
    response: {
        body: {
            items: {
                item: GardenPlant[];
            };
        };
    };
}

export interface GardenPlant {
    cntntsNo: number; // 콘텐츠 고유번호
    cntntsSj: string; // 콘텐츠 제목 (식물 이름)
    rtnFileCours: string; // 파일 경로
    rtnFileSeCode: number; // 파일 구분 코드
    rtnFileSn: number; // 파일 일련번호
    rtnFileUrl: string; // 원본 이미지 URL
    rtnImageDc: string; // 이미지 설명 (보통 식물 이름과 같음)
    rtnImgSeCode: number; // 이미지 구분 코드
    rtnOrginlFileNm: string; // 원본 파일명
    rtnStreFileNm: string; // 저장된 파일명
    rtnThumbFileNm: string; // 썸네일 파일명
    rtnThumbFileUrl: string; // 썸네일 이미지 URL
}
