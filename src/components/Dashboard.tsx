import { useMe } from '../hooks/useMe';

const Dashboard = () => {
    const {data, isLoading, error} = useMe();
    
    if(isLoading) return <div>Loading...</div>
    
    if(error) return <div>Error occurred</div>
    
    return (
        <div>
            Dashboard
            <h3>Welcome {data.user.name}</h3>
        </div>
    )
}

export default Dashboard