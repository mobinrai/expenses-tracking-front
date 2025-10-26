import { useOutletContext } from "react-router-dom"
import type { IUserResponse } from "../../../types/UserTypes"
import { useInfiniteQuery, useQuery} from "@tanstack/react-query";
import axios from "axios";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from "react";
import { Link } from "react-router-dom";
import Fab from "@mui/material/Fab";
import { AddCircle } from "@mui/icons-material";
import DynamicIcon from "../../global/DynamicIcon";

type TypePeriod = 'monthly'|'quartely'|'yearly'

const Index= () => {
    const user = useOutletContext<IUserResponse>();
    const [period, setPeriod] = useState<TypePeriod>('monthly')
    const [limit, setLimit] = useState(3)
    const {isLoading, data, isError, error} = useQuery({
        queryKey:['budget-actual', user.id],
         queryFn: async()=>{
            const result= await axios.get(`${import.meta.env.VITE_API_URL}/budgets/get-budget-spending/${user.id}/${period}`)
            return result.data
        },
    })
    const {data:infiniteQuery, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status} = useInfiniteQuery({
        queryKey:['budget', user.id, limit],
        queryFn:async({pageParam=1})=>{
            const result= await axios.get(`${import.meta.env.VITE_API_URL}/budgets/get-budget-with-progress/${user.id}?page=${pageParam}&limit=${limit}`)
            return result.data
        },
        initialPageParam:1,
        
        getNextPageParam: (lastPage) => {
            return lastPage.pagination.hasNextPage
                ? lastPage.pagination.currentPage + 1
                : undefined;
        }
    })
    if(isLoading || isFetching) return <h3>Is loading data</h3>
    if(isError || status==='error') return <h3>Error loading data.{error?.message}</h3>
    const allBudgets = infiniteQuery?.pages.flatMap(page=>page.results) || []

    return (
            <div className="flex flex-col gap-4">
                <div className="shadow bg-white p-4 rounded-2xl">
                    <Fab variant="extended">
                        <AddCircle/><Link to='add-new' className="text-[#490b3d]">Add new Budget</Link>
                    </Fab>
                </div>
                <div className="budget-actual-spending-section flex flex-col gap-4 bg-white p-4 rounded-2xl shadow">
                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold">Budget vs Actual Spending</h3>
                        <div className="flex gap-2">
                            <button type="button" className={`border border-gray-400 rounded-full px-4 py-1 ${period==='monthly'?'active:bg-blue-300':''}`} onClick={()=> setPeriod('monthly')}>Monthly</button>
                            <button type="button" className="border border-gray-400 rounded-full px-4 py-1" onClick={()=> setPeriod('quartely')}>Quartely</button>
                            <button type="button" className="border border-gray-400 rounded-full px-4 py-1" onClick={()=> setPeriod('yearly')}>Yearly</button>
                        </div>
                    </div>
                    <div style={{ height: '500px', width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                        data={data}
                        margin={{ top: 5, right: 10, bottom: 20, left: 2 }}
                        title="Actual & spend amount">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="categoryName" />
                        <YAxis/>
                        <Tooltip />
                        <Legend />
                        <Bar 
                            dataKey="totalBudget" 
                            fill="#8884d8" 
                            activeBar={<Rectangle fill="red" stroke="blue" />}
                        />
                        <Bar 
                            dataKey="totalSpending" 
                            fill="#82ca9d" 
                            activeBar={<Rectangle fill="gold" stroke="black" />}
                        />
                        </BarChart>
                    </ResponsiveContainer>
                    </div>
                </div>
                <div className="flex flex-col gap-6 p-4 shadow bg-white rounded-md">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                        <h3 className="text-lg font-bold">Your Budgets</h3>
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
                    {allBudgets.map((budget) => 
                    {
                        return (                        
                            <div key={budget.budgetId} className="flex flex-col gap-2 bg-gray-200 p-8 shadow-lg/30">
                            <div className="flex gap-1 items-center">
                                <div className="bg-[#E7D3BB] py-1 px-2 rounded-lg">
                                    <span className="text-black"><DynamicIcon iconName={budget.icon}/></span>
                                </div>
                                <h3 className="font-bold text-lg">{budget.category}</h3>
                            </div>
                            <p>Allocated Amount: ${budget.allocated}</p>
                            <p>Spent Amount: ${budget.spent}</p>
                            <p>Remainig Amount: ${budget.remaining}</p>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="progress">Progress</label>
                                <meter className="w-full" value={budget.progress} max={100} min={0} id="progress"/>
                            </div>
                            
                        </div>
                        )
    })
                    }
                </div>
                {
                    hasNextPage && 
                    <button onClick={()=>fetchNextPage()} className="btn-primary" disabled={isFetching || !hasNextPage}>
                        {isFetchingNextPage ? 'Loading':'Load More'}
                    </button>
                }
        </div>
    )
}

export default Index