import React from 'react';

interface SelectLimitProps {
    limit: number,
    onLimitValue: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const SelectLimit: React.FC<SelectLimitProps> = ({limit, onLimitValue}) => {
    return (
        <div style={{display:'flex', gap: '15px'}}>
            By page 
            <select
                name="limit"
                value={limit.toString()}
                onChange={(e) => onLimitValue(e)}
                >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
    );
};

export default SelectLimit;