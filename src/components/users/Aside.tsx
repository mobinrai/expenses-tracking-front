import { Wallet, Home, Analytics, BusinessCenter, Receipt, Settings, Logout } from "@mui/icons-material"
import ListWithIcon from "./shared/LinkWithIcon"
import type React from "react"
import { useNavigate } from "react-router-dom"

type AsideProps={
    logout:()=>void,
    isAuthenticated:boolean
}

const Aside:React.FC<AsideProps> = ({logout, isAuthenticated}) => {
    const navigate = useNavigate()
    const logoutAndRedirect=()=>{
        logout()
        if(!isAuthenticated){
            navigate('/')
        }
        
    }
    return (
        <div className="flex flex-col gap-2 bg-primary-500 text-white px-2 pt-4 text-lg md:w-[250px] sm:w-20 transition-all ease-in duration-200 ">
            <ListWithIcon to="dashboard">
                <Wallet/>
                <h3 className="text-2xl font-bold hidden md:flex text-white">Expenses Tracker</h3>
            </ListWithIcon>

            <hr />
            <div className="mt-6 flex flex-col gap-6">
                <ListWithIcon to="dashboard">
                    <Home/>
                    <h3 className="hidden md:flex">Dashboard</h3>
                </ListWithIcon>
                <ListWithIcon to="analytics">
                    <Analytics/>
                    <h3 className="hidden md:flex">Analytics</h3>
                </ListWithIcon>
                <ListWithIcon to="budget">
                    <BusinessCenter/>
                    <h3 className="hidden md:flex">Budget</h3>
                </ListWithIcon>
                <ListWithIcon to="transactions">
                    <Receipt/>
                    <h3 className="hidden md:flex">Transactions</h3>
                </ListWithIcon>
                <ListWithIcon to="settings">
                    <Settings/>
                    <h3 className="hidden md:flex">Settings</h3>
                </ListWithIcon>
            </div>
            <button onClick={logoutAndRedirect} className="hidden md:flex pl-4 py-4 cursor-pointer transition-all ease-in duration-200 hover:text-white">
                <Logout/> Logout
            </button>
        </div>
    )
}

export default Aside