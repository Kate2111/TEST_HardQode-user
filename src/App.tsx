import { requestUsers, requestUsersWithError, User, Query } from "./api";
import "./styles.css";

import { useCallback, useEffect, useRef, useState } from "react";
import Users from "./components/users";
import debounce from 'lodash.debounce'


export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [userAge, setUserAge] = useState('')
    const [userName, setUserName] = useState('')
    const refPage = useRef<number>(1);
    refPage.current = page;

    const [filterParams, setFilterParams] = useState<Query>(
        {
            name: '',
            age: '',
            limit: 4,
            offset: 0
        }
    )

 
    useEffect(() => {
        setIsLoading(true);
        setIsError(null);
        console.log(filterParams);
        
        requestUsers(filterParams)
        .then((data) => {
            console.log(data)
            data.length ? setUsers(data) : setIsError('Users not found');
            setIsLoading(false);
        })
        .catch((e) => {
            setIsLoading(false);
            requestUsersWithError()
            .catch((error) => {
                setIsError(error.message);
            });
        });
    }, [filterParams]);
  
    const changePageNext = () => {
        setPage(prev => prev + 1)
        setFilterParams((prev) => ({ ...prev, "offset": (refPage.current - 1)* filterParams.limit }));
    }

    const changePagePrev = () => {
        setPage(prev => prev - 1)
        setFilterParams((prev) => ({ ...prev, "offset": (refPage.current - 1) * filterParams.limit }))
    }

    const updateValueSearch = useCallback(
        debounce((field: string, value: string)=>{
            setFilterParams((prev) => ({ ...prev, [field]: value, 'offset': 0 }));
            setPage(1)
        }, 500),
        []
    )

    const changeValueHandler = (field: string, event: React.ChangeEvent<HTMLInputElement>, setData: (str: string)=> void) => {
        setData(event.target.value);
        updateValueSearch(field, event.target.value)
    }

    return (
        <>
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
            {isLoading ? (
                <h2>Идет загрузка...</h2>
                ) : isError ? (
                    <div>{isError}</div>
                ) : (
                    <Users usersProp={users}/> 
                )
            }
            <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div style={{display:'flex', gap: '15px'}}>
                    By page 
                    <select
                        name="limit"
                        value={filterParams.limit.toString()}
                        onChange={(e) =>
                            setFilterParams((prev) => ({
                            ...prev,
                            "limit": parseInt(e.target.value),
                            "offset": (refPage.current - 1) * filterParams.limit 
                            }))
                        }
                        >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div style={{display:'flex', justifyContent: 'center', gap: '10px', alignItems: 'center'}}>
                    <button 
                        onClick={changePagePrev} 
                        disabled={page <= 1} 
                    >
                        prev
                    </button>

                    <p style={{textAlign: 'center'}}>{page}</p>
                
                    
                    <button 
                        onClick={changePageNext}
                        disabled={page-1 ===  Math.floor(11/filterParams.limit)} 
                    > 
                        next
                    </button>
                </div>
                
            </div>

        </>
       
    );
  }

