import { useNavigate } from 'react-router-dom';

interface MenuProps {
    ariaLabel: string;
    onClick: () => void;
    labelName: string;
    icon: string;
}

const NavigationMenu = () => {
    const navigate = useNavigate();

    const Menu = (props: MenuProps) => (
        <button
            type="button"
            onClick={props?.onClick}
            className="flex flex-1 justify-center items-center text-3xl"
            aria-label={props?.ariaLabel}
        >
            {props.icon}
        </button>
    );

    return (
        <div className="relative z-50 flex gap-2 justify-between bg-white">
            <Menu onClick={() => navigate('/search')} ariaLabel="검색 화면으로 이동" labelName="검색" icon="🔎" />
            <Menu onClick={() => navigate('/home')} ariaLabel="홈 화면으로 이동" labelName="홈" icon="🏠" />
        </div>
    );
};

export default NavigationMenu;
