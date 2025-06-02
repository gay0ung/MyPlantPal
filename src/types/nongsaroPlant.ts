export interface NongsaroPlantSummaryResponse {
    response: {
        body: {
            items: {
                item: NongsaroPlantSummary[];
            };
        };
    };
}
export interface NongsaroPlantResponse {
    response: {
        body: {
            item: NongsaroPlant;
        };
    };
}

export type NongsaroPlantSummary = GardenPlantSummary | DryPlantSummary;
export type NongsaroPlantType = 'garden' | 'dry';
export type NongsaroPlant = GardenPlant | DryPlant;

export interface GardenPlantSummary {
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
    type: NongsaroPlantType;
}

export interface DryPlantSummary {
    clNm: string; // 과(분류)명
    cntntsNo: number; // 콘텐츠 번호
    cntntsSj: string; // 식물명
    imgUrl1: string; // 원본 이미지1 경로
    imgUrl2: string; // 원본 이미지2 경로
    scnm: string; // 학명
    thumbImgUrl1: string; // 썸네일 이미지1 경로
    thumbImgUrl2: string; // 썸네일 이미지2 경로
    type: NongsaroPlantType;
}

export interface GardenPlant {
    adviseInfo: string; // 조언 정보
    batchPlaceInfo: string; // 배치장소 코드
    clCode: string; // 분류 코드(콤마(,)로 구분)
    clCodeNm: string; // 분류 코드명(콤마(,)로 구분)
    cntntsNo: string; // 콘텐츠 번호
    distbNm: string; // 유통 명
    dlthtsCode: string; // 병충해 코드(콤마(,)로 구분)
    dlthtsCodeNm: string; // 병충해 코드명(콤마(,)로 구분)
    dlthtsManageInfo: string; // 병충해 관리 정보
    eclgyCode: string; // 생태 코드(콤마(,)로 구분)
    eclgyCodeNm: string; // 생태 코드명(콤마(,)로 구분)
    etcEraInfo: string; // 기타 시기 정보
    fmlCodeNm: string; // 과 코드명
    fmlNm: string; // 과 명
    fmldeSeasonCode: string; // 과일 계절(콤마(,)로 구분)
    fmldeSeasonCodeNm: string; // 과일 계절명(콤마(,)로 구분)
    fmldecolrCode: string; // 과일색 코드(콤마(,)로 구분)
    fmldecolrCodeNm: string; // 과일색 코드명(콤마(,)로 구분)
    flclrCode: string; // 꽃색 코드(콤마(,)로 구분)
    flclrCodeNm: string; // 꽃색 코드명(콤마(,)로 구분)
    flpodmtBigInfo: string; // 화분직경 대 정보
    flpodmtMddlInfo: string; // 화분직경 중 정보
    flpodmtSmallInfo: string; // 화분직경 소 정보
    fncltyInfo: string; // 기능성 정보
    frtlzrInfo: string; // 비료 정보
    grwhTpCode: string; // 생육 온도 코드
    grwhTpCodeNm: string; // 생육 온도 코드명
    grwhstleCode: string; // 생육형태 코드(콤마(,)로 구분)
    grwhstleCodeNm: string; // 생육형태 코드명(콤마(,)로 구분)
    grwtveCode: string; // 생장속도 코드
    grwtveCodeNm: string; // 생장속도 코드명
    growthAraInfo: string; // 성장 넓이 정보
    growthHgInfo: string; // 성장 높이 정보
    hdCode: string; // 습도 코드
    hdCodeNm: string; // 습도 코드명
    hgBigInfo: string; // 높이 대 정보
    hgMddlInfo: string; // 높이 중 정보
    hgSmallInfo: string; // 높이 소 정보
    ignSeasonCode: string; // 발화 계절 코드(콤마(,)로 구분)
    ignSeasonCodeNm: string; // 발화 계절 코드명(콤마(,)로 구분)
    imageEvlLinkCours: string; // 이미지 평가 링크 경로
    indoorpsncpacompositionCode: string; // 실내정원구성 코드(콤마(,)로 구분)
    indoorpsncpacompositionCodeNm: string; // 실내정원구성 코드명(콤마(,)로 구분)
    lefStleInfo: string; // 잎 형태 정보
    lefcolrCode: string; // 잎색 코드(콤마(,)로 구분)
    lefcolrCodeNm: string; // 잎색 코드명(콤마(,)로 구분)
    lefmrkCode: string; // 잎무늬 코드(콤마(,)로 구분)
    lefmrkCodeNm: string; // 잎무늬 코드명(콤마(,)로 구분)
    lighttdemanddoCode: string; // 광요구도 코드(콤마(,)로 구분)
    lighttdemanddoCodeNm: string; // 광요구도 코드명(콤마(,)로 구분)
    managelevelCode: string; // 관리수준 코드
    managelevelCodeNm: string; // 관리수준 코드명
    managedemanddoCode: string; // 관리요구도 코드
    managedemanddoCodeNm: string; // 관리요구도 코드명
    orgplceInfo: string; // 원산지 정보
    pcBigInfo: string; // 가격 대 정보
    pcMddlInfo: string; // 가격 중 정보
    pcSmallInfo: string; // 가격 소 정보
    plntbneNm: string; // 식물학 명
    plntzrNm: string; // 식물영 명
    postngplaceCode: string; // 배치장소 코드(콤마(,)로 구분)
    postngplaceCodeNm: string; // 배치장소 코드명(콤마(,)로 구분)
    prpgtEraInfo: string; // 번식 시기 정보
    prpgtmthCode: string; // 번식방법 코드(콤마(,)로 구분)
    prpgtmthCodeNm: string; // 번식방법 코드명(콤마(,)로 구분)
    smellCode: string; // 냄새 코드
    smellCodeNm: string; // 냄새 코드명
    soilInfo: string; // 토양 정보
    speclmanageInfo: string; // 특별관리 정보
    toxctyInfo: string; // 독성 정보
    volmeBigInfo: string; // 볼륨 대 정보
    volmeMddlInfo: string; // 볼륨 중 정보
    volmeSmallInfo: string; // 볼륨 소 정보
    vrticlBigInfo: string; // 세로 대 정보
    vrticlMddlInfo: string; // 세로 중 정보
    vrticlSmallInfo: string; // 세로 소 정보
    watercycleAutumnCode: string; // 물주기 가을 코드
    watercycleAutumnCodeNm: string; // 물주기 가을 코드명
    watercycleSprngCode: string; // 물주기 봄 코드
    watercycleSprngCodeNm: string; // 물주기 봄 코드명
    watercycleSummerCode: string; // 물주기 여름 코드
    watercycleSummerCodeNm: string; // 물주기 여름 코드명
    watercycleWinterCode: string; // 물주기 겨울 코드
    watercycleWinterCodeNm: string; // 물주기 겨울 코드명
    widthBigInfo: string; // 가로 대 정보
    widthMddlInfo: string; // 가로 중 정보
    widthSmallInfo: string; // 가로 소 정보
    winterLwetTpCode: string; // 겨울 최저 온도 코드
    winterLwetTpCodeNm: string; // 겨울 최저 온도 코드명
}

export interface DryPlant {
    batchPlaceInfo: string; // 배치장소
    chartrInfo: string; // 특성
    clCodeDc: string; // 과(분류) 설명
    clNm: string; // 과(분류)명
    cntntsNo: number; // 콘텐츠 번호
    cntntsSj: string; // 식물명
    distbNm: string; // 유통명
    dlthtsInfo: string; // 병충해
    flwrInfo: string; // 꽃
    frtlzrInfo: string; // 비료
    grwhTpInfo: string; // 생육온도
    grwtInfo: string; // 생장형
    grwtseVeNm: string; // 생장속도
    hgtmMhmrInfo: string; // 고온다습
    lfclChngeInfo: string; // 엽색변화
    lightImgUrl1: string; // 광 적응성 이미지1
    lightImgUrl2: string; // 광 적응성 이미지2(6개월 후 발코니 창측)
    lightImgUrl3: string; // 광 적응성 이미지3(6개월 후 발코니 내측)
    lighttInfo: string; // 광
    mainImgUrl1: string; // 대표이미지1
    mainImgUrl2: string; // 대표이미지2
    manageDemandNm: string; // 관리요구도
    manageLevelNm: string; // 관리수준
    orgplce: string; // 원산지
    prpgtInfo: string; // 번식
    pswntrTpInfo: string; // 월동온도
    rdxStleNm: string; // 뿌리형태
    scnm: string; // 학명
    stleSeNm: string; // 형태분류
    tipInfo: string; // 팁
    waterCycleInfo: string; // 물주기
}
