import Fab from '@mui/material/Fab'
import { AddCircle, Delete, EditNote} from '@mui/icons-material'
import { Link, useOutletContext } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { IUserResponse } from '../../../types/UserTypes'
import axios from 'axios'
import { useState } from 'react'
import DynamicIcon from '../../global/DynamicIcon'

const Index = () => {
    const [limit, setLimit] = useState(3)
    const user = useOutletContext<IUserResponse>();
    const {data, fetchNextPage, isFetching, hasNextPage, isFetchingNextPage, error} = useInfiniteQuery({
        queryKey:['userTransactions', user.id],
        queryFn:async({pageParam=1})=>{
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/transactions?userId=${user.id}&page=${pageParam}&limit=${limit}`)
            return result.data
        },
        initialPageParam:1,

        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasNextPage
                ? lastPage.pagination.currentPage + 1
                : undefined;
        }
    })
    if(isFetching){
        return <h3>Is Fetching Data...</h3>
    }
    if(error){
        return <h3>{error.message}</h3>
    }

    const allTransactions = data?.pages.flatMap(page=>page.data)

    return (
        <div className="flex flex-col gap-4">
            <div className="shadow bg-white p-4 rounded-2xl">
                    <Fab variant="extended">
                        <AddCircle/><Link to='add-new' className="text-[#490b3d]">Add new Transaction</Link>
                    </Fab>
                </div>
            <div className="flex flex-col p-6 shadow-md bg-white">
                <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                    <h3 className="text-lg font-bold">Recent Transactions</h3>
                    <div className="flex gap-4 items-center justify-center">
                        <h3>Limit :</h3>
                        <select name="" id="" value={limit} onChange={(e)=>setLimit(parseInt(e.target.value))} className="border border-gray-300">
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                </div>
                {
                    allTransactions && allTransactions.map(transaction=>{
                        return <div key={transaction.id} className=''>
                            <div className='flex items-center gap-4'>
                                <DynamicIcon iconName={transaction.categoryId.icon}/>
                                <div className='flex-1 flex flex-col'>
                                    <h3 className='font-bold text-lg'>{transaction.categoryId.name}</h3>
                                    <p>Description: <span className='text-gray-400'>{transaction.description}</span></p>
                                    <p>Type: <span className='text-gray-400'>{transaction.type}</span></p>
                                    <p>Tags: <span className='text-gray-400'>{transaction.tags.join(', ')}</span></p>

                                </div>
                                <div className="flex items-center+ gap-2">
                                    <span className={`font-bold ${transaction.amount<0?'text-red-500':'text-[#4cc9f0]'}`}>${transaction.amount}</span>
                                    <EditNote sx={{fontSize:'20px', cursor:'pointer'}} titleAccess='Edit Transaction'/>
                                    <Delete sx={{fontSize:'20px', cursor:'pointer'}} titleAccess='Delete Transaction'/>
                                </div>
                            </div>
                        </div>
                    })
                }
                {
                    hasNextPage && 
                    <button onClick={()=>fetchNextPage()}  disabled={isFetching || !hasNextPage} className='btn-primary'>
                        {isFetchingNextPage ? 'Loading' : 'Load More'}
                    </button>
                }
            </div>
        </div>
    )
}

export default Index