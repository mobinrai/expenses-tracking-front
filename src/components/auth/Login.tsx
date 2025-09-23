import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { LoginCredentials } from "../../types/UserTypes"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useAuth } from "../../provider/AuthProvider"

const Login = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const redirectTo = searchParams.get('redirect') || '/dashboard';
    const queryClient= useQueryClient();
    const formRef = useRef<HTMLFormElement>(null);
    const {register,handleSubmit, formState:{errors}} = useForm<LoginCredentials>();
    const {authUser,login} = useAuth();

    useEffect(()=>{
        if(authUser.data){
            navigate(redirectTo, { replace: true })
        }
    },[redirectTo, authUser])

    const mutation= useMutation({
        mutationFn: async(data:LoginCredentials) => {
            const result = await login(data)
            return result;
        },
        
        onSuccess:(data) => {
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({queryKey:['me']});
            navigate('/dashboard');
        }
    });

    const onSubmit:SubmitHandler<LoginCredentials> = (data: any) => mutation.mutate(data);
    
    if(authUser.isLoading){
        return
    }
    
    
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
                <button type="submit" className="border border-primary-500 bg-primary-500 py-1 cursor-pointer text-black font-bold hover:bg-white hover:text-primary-500">
                    {mutation.isPending ? 'Logging in...' : 'Login'}
                </button>
                <span>If you haven't got an account. Please <Link to='/register' className="text-blue-500 font-bold cursor-pointer">Register</Link> </span>
            </form>
        </div>
    )
}

export default Login