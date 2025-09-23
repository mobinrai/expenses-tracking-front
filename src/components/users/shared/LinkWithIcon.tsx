import type React from "react"
import { Link } from "react-router-dom"

type LinkWithIconProps={
    children:React.ReactNode,
    to:string
}
const LinkWithIcon:React.FC<LinkWithIconProps> = ({to, children}) => {
    return (
        <Link to={to} className="flex items-center justify-start gap-2 cursor-pointer hover:bg-[rgba(255,255,255,0.2)] hover:text-white py-2 pl-4">
            {children}
        </Link>
    )
}

export default LinkWithIcon