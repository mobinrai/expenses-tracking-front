import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { IUser } from "../../types/IUser"
import { Link, useNavigate } from "react-router-dom"


const Register = () => {
    const navigate = useNavigate();
    const queryClient= useQueryClient();
    const {register, handleSubmit,formState:{errors}} = useForm<IUser>();
    const mutation = useMutation({
        mutationFn:async(data:IUser)=>{
            const res = await axios.post(`${import.meta.env.VITE_API_URL}auth/register`,{
                name: data.name,
                email:data.email,
                password:data.password,
                settings: {
                    darkMode: data.settings?.darkMode || false,
                    notifications: data.settings?.notifications || false
                }
            })
            return res.data;
        },
        onSuccess:(data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            queryClient.invalidateQueries({queryKey:['me']});
            navigate('/dashboard');
        }
    })
    const onSubmit:SubmitHandler<IUser>=(data)=>mutation.mutate(data);
    return (
        <div className="flex flex-col items-center justify-center min-h-lvh ">
            <h3 className="font-bold text-2xl">Register</h3>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 shadow-lg w-full max-w-sm p-4 border border-gray-300">
                {
                    mutation.isError && <div className="text-red-500">Error: {(mutation.error as Error).message}</div>
                }
                <div className="flex flex-col gap-1">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" {...register('name', {required:true, pattern:/^[a-z A-Z]/})} className="border border-gray-400 rounded-md px-3 py-2 outline-0"/>
                    {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                    {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" {...register('email', {required:true})} className="border border-gray-400 rounded-md px-3 py-2 outline-0"/>
                    {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                    {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register('password', {required:true, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/})} className="border border-gray-400 rounded-md px-3 py-2 outline-0"/>
                    {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                    {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex flex-col items-start gap-2">
                        <label htmlFor="notifications">Notifications</label>
                        <input type="checkbox" id="notifications" defaultChecked={true} {...register("settings.notifications")}/>
                    </div>
                    {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                    {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                </div>
                <div>
                    <button type="submit" className="bg-primary-500 text-black font-bold w-full cursor-pointer py-1">Register</button>
                </div>
                <span>If you have already an account. Please <Link to='/login' className="text-blue-500 font-bold cursor-pointer">Login</Link> </span>
            </form>
            
        </div>
    )
}

export default Register