import Login from '../components/auth/Login'
import { createBrowserRouter } from 'react-router-dom';
import Register from '../components/auth/Register';
import Dashboard from '../components/users/Dashboard';
import App from '../App';
import UserLayout from '../components/users/UserLayout';
import Budget from '../components/users/Budget';
import Transactions from '../components/users/Transactions';
import  ProtectedRoute from './ProtectedRoute';

const router = createBrowserRouter([
    {path:'/', Component:App},
    {path:'/login', Component:Login},
    {path:'/register', Component:Register},
    {
        
        element:<ProtectedRoute/>,
        children: [
            {
            Component: UserLayout,
            children: [
                { path: "/dashboard", Component: Dashboard },
                { path: "/budget", Component: Budget },
                { path: "/transactions", Component: Transactions },
            ],
            },
        ],
    }
])

export default router