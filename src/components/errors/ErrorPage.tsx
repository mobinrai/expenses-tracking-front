import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div className="flex flex-col gap-2 items-center justify-center h-screen">
           <span className="text-2xl font-bold">OOppss!!! Something went wrong.</span>
           <span className="text-2xl text-red-500 font-bold"> {error?.message}</span>
        </div>
    )
}

export default ErrorPage