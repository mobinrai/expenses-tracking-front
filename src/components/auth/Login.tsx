import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import {  useRef } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { LoginCredentials } from "../../types/LoginCredentials"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const queryClient= useQueryClient();
    const formRef = useRef<HTMLFormElement>(null);
    const {register,handleSubmit, formState:{errors}} = useForm<LoginCredentials>();
    
    const mutation= useMutation({
        mutationFn: async(data:LoginCredentials) => {
            console.log(data);
            const result = await axios.post("http://localhost:3000/auth/login",{
                email: data.email,
                password: data.password
            })
            return result.data;
        },
        
        onSuccess:(data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            queryClient.invalidateQueries({queryKey:['me']});
            navigate('/dashboard');
        }
    });

    const onSubmit:SubmitHandler<LoginCredentials> = (data: any) => mutation.mutate(data);
    
    return (
        <div className="flex flex-col items-center justify-center min-h-lvh bg-gray-100 overflow-y-hidden">
            <h2 className="text-2xl font-bold">Login</h2>

            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm shadow-lg p-4 border border-gray-300">
                {
                    mutation.isError && <div className="text-red-500">Error: {(mutation.error as Error).message}</div>
                }
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input type="email" {...register('email', {required:true})} placeholder="enter your email" className="border py-1.5 pl-1 border-gray-400 outline-0"/>
                    {errors.email && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input type="password" {...register('password',{required:true})} placeholder="password" className="border py-1.5 pl-1 border-gray-400 outline-0"/>
                    {errors.password && <span className="text-sm text-red-500">This field is required</span>}
                </div>
                <button type="submit" className="border border-primary-500 bg-primary-500 py-1 cursor-pointer text-white hover:bg-white hover:text-primary-500">
                    {mutation.isPending ? 'Logging in...' : 'Login'}
                </button>
                <span>If you haven't got an account. Please <Link to='/register' className="text-blue-500 font-bold cursor-pointer">Register</Link> </span>
            </form>
        </div>
    )
}

export default Login