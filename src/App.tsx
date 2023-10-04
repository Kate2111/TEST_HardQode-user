import { requestUsers, requestUsersWithError, User, Query } from "./api";
import "./styles.css";

import { useEffect, useRef, useState } from "react";
import Users from "./components/users";


export default function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState<string | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
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
  
        requestUsers(filterParams)
        .then((data) => {
            setIsLoading(false);
            data.length ? setUsers(data) : setIsError('Users not found')
        })
        .catch((e) => {
            setIsLoading(false);
            requestUsersWithError()
            .catch((error) => {
                setIsError(error.message);
            });
        });
    }, [filterParams, page]);
  
    const changePageNext = () => {
        setPage(prev => prev + 1)
        setFilterParams((prev) => ({ ...prev, "offset": (refPage.current - 1)* filterParams.limit }));
    }

    const changePagePrev = () => {
        setPage(prev => prev - 1)
        setFilterParams((prev) => ({ ...prev, "offset": (refPage.current - 1) * filterParams.limit }))
    }

    return (
        <>
            <div>
                <input
                type="text"
                value={filterParams.name}
                onChange={(e) =>  setFilterParams((prev) => ({ ...prev, 'name': e.target.value }))}
                placeholder='Name'
                />
            
                <input
                type="text"
                value={filterParams.age}
                onChange={(e) =>  setFilterParams((prev) => ({ ...prev, 'age': e.target.value }))}
                placeholder='Age'
                />
            </div>
            {isLoading ? (
                <h2>Идет загрузка...</h2>
                ) : isError ? (
                    <div>{isError}</div>
                ) : (
                    <>
                        <Users usersProp={users}/> 
                    </>
                   
                )
            }
            <div>
                By page 
                <select
                    name="limit"
                    value={filterParams.limit.toString()}
                    onChange={(e) =>
                        setFilterParams((prev) => ({
                        ...prev,
                        "limit": parseInt(e.target.value)
                        }))
                    }
                    >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <button 
                    onClick={changePagePrev} 
                    disabled={page <= 1} 
                >
                    prev
                </button>

                <p>{page}</p>
              
                
                <button 
                    onClick={changePageNext}
                    disabled={page-1 ===  Math.floor(11/filterParams.limit)} 
                > 
                    next
                </button>
            </div>

        </>
       
    );
  }

