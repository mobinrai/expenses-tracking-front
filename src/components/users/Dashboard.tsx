import {AccountBalanceWallet, Savings, ShoppingCart, AttachMoney} from '@mui/icons-material';
import SingleCard from './shared/SingleCard';

const Dashboard = () => {
    return (
        <section className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-[repeat(1,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                <SingleCard title='Total Income' Icon={AttachMoney} amount={5000} text='12% from last month' bgColor='bg-[#4cc9f0]'/>
                <SingleCard title='Total Expenses' Icon={ShoppingCart} amount={5000} text='12% from last month' bgColor='bg-[#f72585]'/>
                <SingleCard title='Balance' Icon={AccountBalanceWallet} amount={5000} text='12% from last month' bgColor='bg-blue-500'/>
                <SingleCard title='Saving Rate' Icon={Savings} amount={5000} text='12% from last month' bgColor='bg-primary-500'/>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <div className="basis-1/2 flex flex-col gap-2 shadow-md p-4 bg-white transition-all ease-in duration-1000">
                    <div className="flex justify-between items-center">
                        <h3>Expense Analysis</h3>
                        <span className="bg-blue-600 text-white text-2xl py-2 px-4 rounded right">$</span>
                    </div>
                    <span className="">$5,000</span>
                    <span className="text-green-600">12% from last month</span>
                </div>
                <div className="basis-1/2 flex flex-col gap-2 shadow-md p-4 bg-white transition-all ease-in duration-1000">
                    <div className="flex justify-between items-center">
                        <h3>Spending by Category</h3>
                        <span className="bg-blue-600 text-white text-2xl py-2 px-4 rounded right">$</span>
                    </div>
                    <span className="">$5,000</span>
                    <span className="text-green-600">12% from last month</span>
                </div>
            </div>
            <div className="transaction shadow-md p-4 bg-white transition-all ease-in duration-1000">
                <div className="header flex justify-between">
                    <h3>Recent Transactions</h3>
                    <button>view all</button>
                </div>
                <div className="content">
                    <div className="flex justify-between border-b border-gray-400 py-4">
                        <div className="flex gap-2">
                            <div className="icon">icon</div>
                            <div className="flex flex-col gap-1">
                                <h3>Title</h3>
                                <span>date</span>
                            </div>
                        </div>
                        <div className="text-red-600 font-bold">-$85.00</div>
                    </div>                    
                    <div className="flex justify-between border-b border-gray-400 py-4">
                        <div className="flex gap-2">
                            <div className="icon">icon</div>
                            <div className="flex flex-col gap-1">
                                <h3>Title</h3>
                                <span>date</span>
                            </div>
                        </div>
                        <div className="text-red-600 font-bold">-$85.00</div>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 py-4">
                        <div className="flex gap-2">
                            <div className="icon">icon</div>
                            <div className="flex flex-col gap-1">
                                <h3>Title</h3>
                                <span>date</span>
                            </div>
                        </div>
                        <div className="text-red-600 font-bold">-$85.00</div>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 py-4">
                        <div className="flex gap-2">
                            <div className="icon">icon</div>
                            <div className="flex flex-col gap-1">
                                <h3>Title</h3>
                                <span>date</span>
                            </div>
                        </div>
                        <div className="text-red-600 font-bold">-$85.00</div>
                    </div>
                    <div className="flex justify-between border-b border-gray-400 py-4">
                        <div className="flex gap-2">
                            <div className="icon">icon</div>
                            <div className="flex flex-col gap-1">
                                <h3>Title</h3>
                                <span>date</span>
                            </div>
                        </div>
                        <div className="text-red-600 font-bold">-$85.00</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Dashboard