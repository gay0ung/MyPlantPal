import React from 'react';

interface TxtInputProps {
    placeholder: string;
    classNames?: string;
}

const TxtInput = ({ placeholder, classNames }: TxtInputProps) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`w-[80%] max-w-80 placeholder: text-center ${classNames}`}
        />
    );
};

export default TxtInput;
