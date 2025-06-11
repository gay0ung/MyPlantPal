import { useEffect } from 'react';
import { useSnackbarStore } from './stores/snackbarStore';

const SnackBar = () => {
    const { isOpen, message, duration, close } = useSnackbarStore();

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                close();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, duration, close]);

    return (
        <div
            className={`fixed z-10 -translate-x-1/2 left-1/2 w-1/2 p-3 bg-blue-400 ${isOpen ? 'opacity-100 bottom-[calc(var(--navbar-height)+20px)]' : 'opacity-100 bottom-0'} transition-bottom duration-300 ease-out`}
            role="alert"
        >
            <p>{message}</p>
        </div>
    );
};

export default SnackBar;
