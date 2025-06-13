import { useEffect, useMemo } from 'react';
import { useSnackbarStore } from './stores/snackbarStore';

const SnackBar = () => {
    const { isOpen, message, duration, close, type } = useSnackbarStore();

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                close();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, close]);

    const bgColor = useMemo(() => {
        switch (type) {
            case 'info':
                return 'bg-blue-400';
            case 'error':
                return 'bg-red-400';
            default:
                return 'bg-blue-400';
        }
    }, [type]);

    return (
        <div
            className={`fixed z-10 -translate-x-1/2 left-1/2 w-1/2 p-3 ${isOpen ? 'opacity-100 bottom-[calc(var(--navbar-height)+20px)]' : 'opacity-100 bottom-0'} transition-bottom duration-300 ease-out ${bgColor}`}
            role="alert"
        >
            <p>{message}</p>
        </div>
    );
};

export default SnackBar;
