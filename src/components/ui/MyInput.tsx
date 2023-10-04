import React from 'react';

interface MyInputProps {
    valueInput: string,
    handleFilterChange: (e: string) => void,
    placeholderValue: string
}

const MyInput: React.FC<MyInputProps> = ({valueInput, handleFilterChange,placeholderValue}) => {
    return (
        <input
            type="text"
            value={valueInput}
            onChange={(e) => handleFilterChange(e.target.value)}
            placeholder={placeholderValue}
        />
    );
};

export default MyInput;