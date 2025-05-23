import React, { ChangeEvent } from 'react';

interface TxtInputProps {
    placeholder: string;
    classNames?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TxtInput = ({ classNames = '', ...reset }: TxtInputProps) => {
    return <input type="text" {...reset} className={`w-[80%] max-w-80 placeholder:text-center ${classNames}`} />;
};

export default TxtInput;
