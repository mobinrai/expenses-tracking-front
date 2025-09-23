import { useOutletContext } from "react-router-dom"
import type { IUserResponse } from "../../types/UserTypes"
import { useQuery} from "@tanstack/react-query";
import axios from "axios";
// import { useState } from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// type TypePeriod = 'monthly'|'quartely'|'yearly'
const Budget= () => {
    const user = useOutletContext<IUserResponse>();
    // const [period, setPeriod] = useState<TypePeriod>('monthly')
    const {isLoading, data, isError, error} = useQuery({
        queryKey:['budget-actual', user.id],
         queryFn: async()=>{
            const result= await axios.get(`${import.meta.env.VITE_API_URL}/budgets/get-budget-spending/${user.id}/monthly`)
            return result.data
        },
    })
    // const {data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status} = useInfiniteQuery({
    //     queryKey:['budget', user.id],
    //     queryFn:async({pageParam=1})=>{
    //         const result= await axios(`${import.meta.env.VITE_API_URL}/budgets/user/${user.id}?page=${pageParam}`)
    //         return result.data
    //     },
    //     initialPageParam:1,
    //     getNextPageParam: (lastPage) =>{
    //         return lastPage.pagination.hasNextPage? lastPage.pagination.page+1:undefined
    //     },
    // })
    if(isLoading) return <h3>Is loading data</h3>
    if(isError) return <h3>Error loading data.{error.message}</h3>
    //infiniteQuery returns data.pages in array and we are extracting data from page
    // const allBudgets = data?.pages.flatMap(page=>page.data) || []
    return (
        <div className="flex flex-col gap-4">
            <div className="budget-actual-spending-section flex">
                <div style={{ height: '400px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                    data={data}
                    margin={{ top: 5, right: 10, bottom: 20, left: 5 }}
                    >
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
            <div className="flex flex-col gap-6">
                {/* {allBudgets.map((budget) => (                    
                    <div key={budget._id} className="flex flex-col gap-1">
                        <h3>{budget.categoryId?.name}</h3>
                        <p>Amount: ${budget.amount}</p>
                        <p>Currency: ${budget.currency}</p>
                        {
                            budget.startDate && 
                            <p>Start Date:{new Date(budget.startDate).toLocaleDateString()}</p>
                        }
                        {
                            budget.endDate && 
                            <p>End Date:{new Date(budget.endDate).toLocaleDateString()}</p>
                        }
                        <p>Created At:{new Date(budget.createdAt).toLocaleDateString()}</p>
                    </div>
                    ))
                } */}
            </div>
            {/* {
                hasNextPage && 
                <button onClick={()=>fetchNextPage} disabled={isFetching || !hasNextPage}>
                    {isFetchingNextPage ? 'Loading':'Load More'}
                </button>
            } */}
        </div>
    )
}

export default Budget