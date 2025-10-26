import  dayjs, {Dayjs} from 'dayjs';
import { useOutletContext } from 'react-router-dom';
import { type IUserResponse } from '../../../types/UserTypes';
import Stack from '@mui/material/Stack';
import { Controller, useForm } from 'react-hook-form';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Add, ControlPoint } from '@mui/icons-material';
import useFetchCategories from '../../../hooks/useFetchCategories';
import type { CategoryType } from '../../../types/AllTypes';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Chip from '@mui/material/Chip';
import { useState } from 'react';

type Transaction={
    category:string;
    transactionType:"income"|"expense";
    amount:number;
    tags:string[];
    date:Dayjs | null,
    description:string;
}

const AddNew = () => {
    const [inputValue, setInputValue] = useState('')
    const {register, control, handleSubmit, formState:{errors}, watch, setValue} = useForm<Transaction>({
            defaultValues:{
                category:'',
                transactionType:'income',
                amount:undefined,
                tags:[],
                date:null,
                description:'',
            }
        })
    
    const user = useOutletContext<IUserResponse>()
    const {isLoading, data:categories, isError, error} = useFetchCategories()
    
    const submitForm=(data: Transaction)=>{
        // e.preventDefault()
        console.log(data);
    }

    if(isLoading) return <h3>Category is being fetched.</h3>
    if(isError) return <h3 className='error-message'>{error.message}</h3>

    const tags=watch('tags')

    const handleDelete=(tagToDelete:string)=>{
        setValue('tags', tags.filter(tag=> tag !==tagToDelete))
    }
    
    const handleAddTag = ()=>{
        const trimmed= inputValue.trim()
        if(trimmed && !tags.includes(trimmed)){
            setValue('tags', [...tags, trimmed])
        }
        setInputValue("")
    }
        
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
    }
    const handleBlur = ()=>{
        handleAddTag()
    }
    return (
        
        <div className='flex flex-col gap-4 p-4 text-[#490b3d] bg-white shadow-md'>
            {
            !user.accountId ? <h3>Add Account
            </h3>
            :  
            <div className="flex flex-col">
                <div className='flex items-center justify-between mb-8'>
                    <h3>Add New Transaction</h3>
                    <button>Back</button>
                </div>
                <form onSubmit={handleSubmit(submitForm)} className='w-2/5 flex flex-col gap-8'>
                    <Stack spacing={3}>
                    <Controller name='transactionType' control={control} render={({field})=>{
                        return <FormControl>
                        <FormLabel id='transaction-type'>Type</FormLabel>
                        <RadioGroup aria-labelledby='transaction-type' row {...field}>
                            <FormControlLabel value='income' control={<Radio/>} label='Income'/>
                            <FormControlLabel value='expense' control={<Radio/>} label='Expense'/>
                        </RadioGroup>
                    </FormControl>
                    }}/>
                    {
                    categories.length > 0 && (
                        <Controller
                            name="category"
                            control={control}
                            rules={{
                                required:'Please select atleast one category'
                            }}
                            render={({ field, fieldState: {error}  }) => {
                                return (
                                <FormControl>
                                    <FormLabel id="Category">Category</FormLabel>
                                    <Select labelId='Category' {...field} value={field.value ?? ''}>
                                        <MenuItem value=''>--Select Category--</MenuItem>
                                        {
                                            categories.map((category:CategoryType)=>{
                                                return <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                            })}
                                    </Select>
                                    <span className='error-message'>{error?.message}</span>
                                </FormControl>
                                )
                            }}
                            />
                    )}
                        <FormControl>
                            <TextField label="Amount" type='number'
                            {
                                ...register('amount', {required:{value:true, message:'Amount field is required.'},
                                    min:{value:10, message:"Amount must be greater or equal to 10"},
                                    max:{value:500, message:'Amount must not be greater than 500.'}, valueAsNumber:true})
                            }/>
                            {(errors.amount?.type === "required" || errors.amount?.type === "min" || errors.amount?.type === "max") && (
                                <span className='error-message'>{errors.amount.message}</span>
                            )}
                        </FormControl>
                        
                        <FormControl>
                            <TextField label='Description' multiline
                        {
                            ...register('description', {required:{value:true, message:'Description field is required.'}})
                        }
                        />
                        {(errors.description?.type === "required") && (
                            <span className='error-message'>{errors.description.message}</span>
                        )}
                        </FormControl>
                        <FormControl>
                            <Controller name='tags'
                            rules={{required:'Tags Field is required'}}
                            control={control}
                            render={({field})=>{
                                console.log(field.value);
                                return <div className='flex flex-col gap-2'>
                                    <div className='w-96'>
                                        {
                                            field.value.map((tag:string, index:number)=><Chip key={`${tag}-${index}`} label={tag} onDelete={()=>handleDelete(tag)}/>)
                                        }
                                    </div>
                                
                                <div className='flex relative'>
                                    <TextField
                                    label="Add a tag"
                                    variant="outlined"
                                    value={inputValue}
                                    className='relative'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    fullWidth
                                    />
                                    <button type='button' aria-label='Click to add tags'  className='absolute top-4 right-1 cursor-pointer' onClick={handleAddTag}><Add /></button>
                                    
                                </div>
                                </div>
                                }
                            }/>

                            {(errors.tags?.type === "required") && (
                                <span className='error-message'>{errors.tags.message}</span>
                            )}
                        </FormControl>
                        <FormControl>
                            <Controller name="date" control={control} rules={{required:'Date Field is required'}} render={({field})=>(
                                <DatePicker  {...field} onChange={field.onChange} minDate={dayjs().subtract(5, 'year')} maxDate={dayjs().add(1, 'year')} slotProps={{
                                    textField: { error: false}
                                }} format="YYYY-MM-DD"/> 
                                )}/>
                            {(errors.date?.type === "required") && (
                                <span className='error-message'>{errors.date.message}</span>
                            )}
                        </FormControl>
                    <button type="submit" className="btn-primary"><ControlPoint/> Submit</button>
                </Stack>
                </form>
            </div>
        }
        </div>
    )
}

export default AddNew