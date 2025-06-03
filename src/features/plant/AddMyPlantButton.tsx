interface AddMyPlantButtonProps {
    onClick: () => void;
}

const AddMyPlantButton = ({ ...reset }: AddMyPlantButtonProps) => {
    return <button {...reset}>식물 추가 하기</button>;
};

export default AddMyPlantButton;
