import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import type { IUser } from "../../types/IUser"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../provider/AuthProvider"


const Register = () => {
    const navigate = useNavigate();
    const queryClient= useQueryClient();
    const {register, handleSubmit,formState:{errors}} = useForm<IUser>();
    const {userRegister} = useAuth();
    const mutation = useMutation({
        mutationFn: async(data:IUser)=>{
            const res = await userRegister(data);
            return res;
        },
        onSuccess:(data) => {
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries({queryKey:['me']});
            navigate('/dashboard');
        }
    })

    const onSubmit:SubmitHandler<IUser>=(data)=>mutation.mutate(data);

    return (
        <div className="min-h-lvh bg-[url('./assets/bg-image-2.jpg')] bg-no-repeat bg-cover">
            <div className="flex items-center justify-center bg-black/30 min-h-lvh">
                <div className="flex flex-col items-center justify-center bg-white p-8 rounded-md">
                <h3 className="font-bold text-2xl">Register</h3>
                <hr />
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-sm p-4">
                    {
                        mutation.isError && <div className="text-red-500">Error: {(mutation.error as Error).message}</div>
                    }
                    <div className="flex flex-col gap-1">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" id="name" {...register('name', {required:true, pattern:/^[a-z A-Z]/})} 
                        className="border border-gray-400 rounded-md px-3 py-2 outline-0"
                        defaultValue={''}
                        placeholder="enter your full name"/>
                        {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                        {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" {...register('email', {required:true})} 
                        className="border border-gray-400 rounded-md px-3 py-2 outline-0"
                        defaultValue={''}
                        placeholder="enter your email"/>
                        {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                        {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" 
                        {...register('password', {required:true, pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/})} className="border border-gray-400 rounded-md px-3 py-2 outline-0"
                        placeholder="enter your password"
                        defaultValue={''}/>
                        {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                        {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <label htmlFor="notifications">Notifications</label>
                            <input type="checkbox" id="notifications" defaultChecked={true} {...register("settings.notifications")}/>
                        </div>
                        {errors.name && <span className="text-sm text-red-500">This field is required</span>}
                        {errors.name?.type === 'pattern' && <span className="text-sm text-red-500">Invalid name format</span>}
                    </div>
                    <div>
                        <button type="submit" className="border border-primary-500 bg-primary-500 py-1 cursor-pointer text-black font-bold hover:bg-white hover:text-primary-500 w-full" disabled={mutation.isPending?true:false}>Register</button>
                    </div>
                    <span>If you have already an account. Please <Link to='/' className="text-[#161f6d] font-bold cursor-pointer w-fit border-b">Login</Link> </span>
                </form>
            </div>
            </div>
        </div>
    )
}

export default Register