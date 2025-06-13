interface AddMyPlantButtonProps {
    onClick: () => void;
    isAddingPlant: boolean;
}

const AddMyPlantButton = ({ onClick, isAddingPlant }: AddMyPlantButtonProps) => {
    return (
        <button onClick={onClick} disabled={isAddingPlant}>
            {isAddingPlant ? '식물 추가중...' : '식물 추가 하기'}
        </button>
    );
};

export default AddMyPlantButton;
