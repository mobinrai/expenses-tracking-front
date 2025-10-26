import { useMe } from '../hooks/useMe';
import { Navigate, Outlet, useLocation } from "react-router-dom"


export default function ProtectedRoute() {
    const { data: user, isLoading, isError } = useMe();
    const location = useLocation();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !user) {
        return (
            <Navigate
            to="/"
            replace
            state={{ from: location }} // Pass location via state
        />
        )
    }

    return <Outlet />;
}