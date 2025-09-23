import { Outlet } from "react-router-dom"
import Aside from "./Aside"
import { useAuth } from "../../provider/AuthProvider";
import Header from "./Header";
import type { IUserResponse } from "../../types/UserTypes";

const UserLayout = () => {
    const { authUser, logout,isAuthenticated } = useAuth();
    const { isLoading, isError, error, data} = authUser;

    if(isLoading){
        return <div>Loading...</div>
    }

    if(isError){
        return <div>Error: Something went wrong. {error.message}</div>
    }
    return (
        <div className="grid h-screen grid-cols-[80px_1fr] md:grid-cols-[250px_1fr]">
            {/* Sidebar (site-wide nav) */}
            <Aside logout={logout} isAuthenticated={isAuthenticated}/>
            {/* Main content area */}
            <div className="flex flex-col w-full">
                <Header user={data as IUserResponse}/>   
                <div className="bg-[#f5f7fb] h-full p-4">
                    <Outlet context={data as IUserResponse}/>
                </div>
            </div>
        </div>
        

    )
}

export default UserLayout