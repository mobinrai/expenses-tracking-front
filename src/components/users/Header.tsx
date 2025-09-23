import type React from "react"
import type { IUserResponse } from "../../types/UserTypes"

type UserProps ={
    user:Pick<IUserResponse, 'name'>
}

const Header:React.FC<UserProps> = ({user}) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-0 justify-between px-4 py-6 min-[389px]:flex-row">
            <form action="">
                <input type="text" name="search-transactions" id="searchTransactions" placeholder="search transactions" className="border border-gray-500 px-3 py-1 rounded-full outline-0"/>
            </form>
            <span>{user.name}</span>
        </div>
    )
}

export default Header