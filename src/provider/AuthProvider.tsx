import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useMe } from '../hooks/useMe';
import type { IUserResponse, LoginCredentials } from '../types/UserTypes';
import axios from 'axios';
import { useQueryClient, type UseQueryResult } from '@tanstack/react-query';
import type { IUser } from '../types/IUser';


type AuthContextType = {
    isAuthenticated: boolean;
    authUser: UseQueryResult<IUserResponse>;
    login: (data: LoginCredentials) => Promise<any>;
    userRegister: (data: IUser) => Promise<any>;
    logout: () => void;
};

type AuthProviderProps = {
    children: ReactNode;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const queryClient = useQueryClient();
    const authuser = useMe();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token){
            setIsAuthenticated(!isAuthenticated)
        }
        
    },[])

    const login = async (data: LoginCredentials) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            email: data.email,
            password: data.password
        });
        setIsAuthenticated(true);
        return result.data;
    };

    const userRegister = async (data: IUser) => {
        const result = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{
                name: data.name,
                email:data.email,
                password:data.password,
                settings: {
                    darkMode: data.settings?.darkMode || false,
                    notifications: data.settings?.notifications || false
                }
            })
        return result.data;
    };

    const logout = ():void => {
        // await axios.post('/logout');
        queryClient.removeQueries({ queryKey: ['me'] });
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

    const value: AuthContextType = {
        authUser: authuser ,
        isAuthenticated,
        login,
        logout,
        userRegister
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};