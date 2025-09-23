import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { IUserResponse } from "../types/UserTypes";

export function useMe() {
    const token = localStorage.getItem('token')
    return useQuery<IUserResponse>({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}/auth/me`, {
                headers: {  'Authorization': `Bearer ${token}` }
            });
            return res.data.user
        },
        enabled: !!token,
        retry:false
    });
}
