import { requestUsers, requestUsersWithError, User, Query } from "./api";
import "./styles.css";

import { useCallback, useEffect, useRef, useState } from "react";
import Users from "./components/Users";
import debounce from 'lodash.debounce'
import Pagination from "./components/Pagination";
import SelectLimit from "./components/SelectLimit";
import SearchUser from "./components/SearchUser";


export default function App() {
    const [filterParams, setFilterParams] = useState<Query>(
        {
            name: '',
            age: '',
            limit: 4,
            offset: 0
        }
    )

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const refPage = useRef<number>(1);
    refPage.current = page;


    useEffect(() => {
        setIsLoading(true);
        setIsError(null);
        console.log(filterParams)
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
    
    const changePage = (direction: 'next' | 'prev') => {
        setPage(prev => direction === 'next' ? prev + 1 : prev - 1);
        setFilterParams((prev) => ({ ...prev, "offset": (refPage.current - 1)* filterParams.limit }));
    }

    const changeLimit = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterParams((prev) => ({
            ...prev,
            "limit": parseInt(e.target.value),
            "offset": (refPage.current - 1) * parseInt(e.target.value) 
        }))
    }


    return (
        <>
            <SearchUser
                changeValueHandler={changeValueHandler}
            />
            {isLoading ? (
                <h2>Идет загрузка...</h2>
                ) : isError ? (
                    <div>{isError}</div>
                ) : (
                    <Users usersProp={users}/> 
                )
            }
            <div style={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <SelectLimit
                    limit={filterParams.limit}
                    onLimitValue={changeLimit}
                />
                
                <Pagination
                    page={page}
                    onPageValue={changePage}
                    isPrevDisabled={page <= 1}
                    isNextDisabled={page - 1 === Math.floor(11 / filterParams.limit)}
                />
            </div>
        </>
       
    );
  }

