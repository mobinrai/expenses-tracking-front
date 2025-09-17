import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: async () => {
            const res = await axios(`${import.meta.env.VITE_API_URL}auth/me`, {
                headers: {  'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            return res.data
        },
        enabled: !!localStorage.getItem('token')
    });
}
