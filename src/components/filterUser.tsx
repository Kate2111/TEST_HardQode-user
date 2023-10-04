/* import React from 'react';
import MyInput from './ui/MyInput';
import { Query } from '../api';

interface FilterUserProps {
    valueName: string,
    valueAge: string,
    setValueName: () => void,
    setValueAge: () => void
}

const handleFilterChange = (field: keyof Query, value: string | number, setData: (a : string) => void ) => {
    setData((prev) => ({ ...prev, [field]: value }));
};

const FilterUser: React.FC<FilterUserProps> = ({valueName, setValueName, valueAge, setValueAge}) => {
    return (
        <div>
      
          <input
            type="text"
            value={valueName}
            onChange={(e) => handleFilterChange("name", setValueName, e.target.value)}
            placeholder='Name'
          />
       
          <input
            type="text"
            value={valueAge}
            onChange={(e) => handleFilterChange("age", setValueAge, e.target.value)}
            placeholder='Age'
          />
     
      </div>
    );
};

export default FilterUser; */