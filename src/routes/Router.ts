import Login from '../components/auth/Login'
import { createBrowserRouter } from 'react-router-dom';
import Register from '../components/auth/Register';
import Dashboard from '../components/Dashboard';

const router = createBrowserRouter([
        {path:'/login', Component:Login},
        {path:'/register', Component:Register},
        {path:'/dashboard', Component:Dashboard}
])

export default router