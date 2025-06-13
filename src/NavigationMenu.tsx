import { useNavigate } from 'react-router-dom';

interface MenuProps {
    ariaLabel: string;
    onClick: () => void;
    labelName: string;
}

const NavigationMenu = () => {
    const navigate = useNavigate();

    const Menu = (props: MenuProps) => (
        <button type="button" onClick={props?.onClick} className="flex-1" aria-label={props?.ariaLabel}>
            {props?.labelName}
        </button>
    );

    return (
        <div className="relative z-50 flex gap-2 justify-between bg-white">
            <Menu onClick={() => navigate('/search')} ariaLabel="검색 화면으로 이동" labelName="검색" />
            <Menu onClick={() => navigate('/home')} ariaLabel="홈 화면으로 이동" labelName="홈" />
        </div>
    );
};

export default NavigationMenu;
