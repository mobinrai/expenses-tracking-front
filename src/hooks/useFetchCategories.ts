import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const useFetchCategories = (categoryType?:string) => {
    return useQuery({
        queryKey:['categories'],
        queryFn: async()=>{
            let queryType=''
            if(categoryType){
                queryType=`?type=${categoryType}`
            }
            const result = await axios.get(`${import.meta.env.VITE_API_URL}/categories${queryType}`)
            return result.data
        }
    })
}

export default useFetchCategories