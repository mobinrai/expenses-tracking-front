import Login from '../components/auth/Login'
import { createBrowserRouter } from 'react-router-dom';
import Register from '../components/auth/Register';
import Dashboard from '../components/users/Dashboard';
// import App from '../App';
import UserLayout from '../components/users/UserLayout';
import Budget from '../components/users/budget';
import Transactions from '../components/users/transaction';
import NewTransaction from '../components/users/transaction/AddNew';
import  ProtectedRoute from './ProtectedRoute';
import AddNewBudget from '../components/users/budget/AddNew';
import EditBudget from '../components/users/budget/Edit';
import ErrorPage from '../components/errors/ErrorPage';

const router = createBrowserRouter([
    {errorElement:<ErrorPage/>},
    {index:true, Component:Login},
    {path:'/register', Component:Register},
    {
        element:<ProtectedRoute/>,
        children: [
            {
                Component: UserLayout,
                children: [
                    { path: "/dashboard", Component: Dashboard },
                    { path: "/budget",
                        children:[
                            {index: true, Component: Budget},
                            { path: "add-new", Component: AddNewBudget },
                            { path: "edit/:id", Component: EditBudget },
                            { path: "delete/:id", Component: AddNewBudget },
                        ]
                    },
                    
                    { path: "/transactions",
                        children:[
                            {index:true, Component: Transactions},
                            {path:"add-new", Component:NewTransaction}
                        ]
                    },
                ],
            },
        ],
    }
])

export default router