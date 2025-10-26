import { Link } from "react-router-dom"

function App() {
    
    return (
        <div className="flex flex-col items-center justify-center min-h-lvh gap-4">
            <h3>We are expenses tracker.</h3>
            <Link to='/' className="bg-primary-500 text-black shadow-lg p-2 font-bold">Get Started</Link>
            <Link to='/register' className="bg-primary-500 text-black shadow-lg p-2 font-bold">If you don't have a account.</Link>
        </div>
    )
}

export default App
