import React, { useState } from 'react';

interface SearchUserProps {
    changeValueHandler: (field: string, event: React.ChangeEvent<HTMLInputElement>, setData: (str: string)=> void) => void
}


const SearchUser: React.FC<SearchUserProps> = ({changeValueHandler}) => {
    const [userAge, setUserAge] = useState('')
    const [userName, setUserName] = useState('')

    return (
        <div>
            <input
            type="text"
            value={userName}
            onChange={(e) => changeValueHandler('name', e, setUserName)}
            placeholder='Name'
            />
        
            <input
            type="text"
            value={userAge}
            onChange={(e) =>  changeValueHandler('age', e, setUserAge)}
            placeholder='Age'
            />
        </div>
    );
};

export default SearchUser;