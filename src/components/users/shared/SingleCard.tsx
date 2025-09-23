import type React from 'react'

type SingleCardProps = {
    title:string,
    Icon:React.ElementType,
    amount:number,
    text:string,
    bgColor:string
}

const SingleCard:React.FC<SingleCardProps> = ({title,Icon,amount,text, bgColor}) => {
    return (
        <div className="flex flex-col gap-6 shadow-md p-4 transition-all bg-white ease-in duration-1000">
            <div className="flex justify-between items-center">
                <h3 className='font-bold'>{title}</h3>
                <span className={`text-white text-2xl py-1 px-2 rounded right ${bgColor}`}>
                    <Icon/>
                </span>
            </div>
            <div className="flex flex-col gap-1">
                <span className="text-2xl">{amount}</span>
                <span className="text-green-600">{text}</span>
            </div>
        </div>
    )
}

export default SingleCard