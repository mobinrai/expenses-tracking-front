import { ArrowBack, ControlPoint } from "@mui/icons-material"
import Fab from "@mui/material/Fab"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import TextField from "@mui/material/TextField"
import { Link, useNavigate, useOutletContext } from "react-router-dom"
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useForm } from "react-hook-form"
import Stack from "@mui/material/Stack"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import type { IUserResponse } from "../../../types/UserTypes"
import type dayjs from "dayjs"
import FormHelperText from "@mui/material/FormHelperText"
import useFetchCategories from "../../../hooks/useFetchCategories"
import type { CategoryType } from "../../../types/AllTypes"

type Budget={
    categoryId:string;
    period: string;
    amount: number;
    currency:string;
    startDate?:dayjs.Dayjs;
    endDate?:dayjs.Dayjs
}

const AddNew = () => {
    const user = useOutletContext<IUserResponse>();
    const navigate = useNavigate()
    const {isLoading, data:categories, isError, error} = useFetchCategories('expense')
    const {register, control, handleSubmit, formState:{errors}} = useForm<Budget>({
        defaultValues:{
            categoryId:'',
            period:'monthly',
            amount:0,
            startDate:undefined,
            endDate:undefined,
        }
    })

    const mutation = useMutation({
        mutationKey:['add-new-budget', user.id],
        mutationFn: async(data:Budget)=>{
             const result = await axios.post(`${import.meta.env.VITE_API_URL}/budgets`,{
                userId:user.id,
                categoryId:data.categoryId,
                period:data.period,
                amount:data.amount,
                currency:data.currency,
                startDate:data.startDate,
                endDate:data.endDate
            })
        return result.data;
        },
        onMutate:()=>{

        },
        onError(error) {
            console.log(error);  
        },
        onSuccess(){
            navigate('/budget')
        }
    })

    const submitForm=(data: Budget)=>{
        mutation.mutate(data)
    }

    if(isLoading) return <h3>Loading data....</h3>
    if(isError) return <h3>Error fetching data....{error.message}</h3>

    return (
        <div className='flex flex-col gap-4 p-4 text-[#490b3d] bg-white shadow-md'>
            <div className="flex flex-col gap-4 items-center md:flex-row md:justify-between">
                <h3 className="text-2xl font-bold text-[#490b3d]">Add New Budget</h3>
                <Fab variant="extended" size="small">
                    <ArrowBack/> <Link to={"/budget"}>Back</Link>
                </Fab>
            </div>
            <hr className="-mt-1"/>
            <form onSubmit={handleSubmit(submitForm)} className="w-96 flex flex-col gap-8">
                <span className="text-sm text-gray-600">Note: Fields with <span className="text-red-500 font-semibold">*</span> are required.</span>
                <Stack spacing={2}>
                    {
                        categories.length > 0 && (
                        <Controller
                        name="categoryId"
                        control={control}
                        rules={{
                            required:true
                        }}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <InputLabel id="category">Category</InputLabel>
                                <Select labelId="category" {...field}>
                                    <MenuItem value=''>--Select Category--</MenuItem>
                                { categories.map((category:CategoryType)=>
                                    <MenuItem value={category._id}>{category.name}</MenuItem>)
                                }
                                </Select>
                            </FormControl>
                        )}
                        />
                    )
                    }
                    <Controller
                        name="period"
                        control={control}
                        rules={{
                            required:true
                        }}
                        render={({ field }) => (
                            <FormControl variant="standard">
                                <InputLabel id="period">Period</InputLabel>
                                <Select labelId="period" {...field}>
                                    <MenuItem value="">--Select Period--</MenuItem>
                                    <MenuItem value={"weekly"}>Weekly</MenuItem>
                                    <MenuItem value={"monthly"}>Monthly</MenuItem>
                                    <MenuItem value={"yearly"}>Yearly</MenuItem>
                                </Select>
                            </FormControl>    
                        )}
                        />  
                        {errors.period?.type==='required' && <FormHelperText>Please select category</FormHelperText>}  
                    <TextField label="Amount" required variant="standard" {...register('amount', {required:true, min:10, max:500})}
                    error={!!errors.amount} helperText="Please enter amount"/>
                    
                    <Controller name="startDate" control={control}  render={({field})=>(
                        <DatePicker  {...field} onChange={field.onChange} disablePast slotProps={{
                            textField: { error: false, /* Add error handling if needed */ }
                        }} format="YYYY-MM-DD"/> 
                    )}/>
                    <Controller
                    name="endDate"
                    control={control}
                    render={({ field})=>(
                        <DatePicker {...field} disablePast disabled  format="YYYY-MM-DD"/>
                    )}/>
                    <button type="submit" className="btn-primary"><ControlPoint/> Submit</button>
                </Stack>
            </form>
        </div>
    )
}

export default AddNew