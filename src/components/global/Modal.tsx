import React, { useEffect } from 'react'
import { useModal } from '../../provider/GlobalModalProvider'

const Modal = ({children}:{children:React.ReactNode}) => {
    const {closeModal} = useModal()
    useEffect(()=>{
        document.body.classList.add('no-scroll')
        return ()=>{
            document.body.classList.remove('no-scroll')
        }
    },[])
    return (
        <div className='bg-black/90 fixed top-0 left-0 bottom-0 z-40 w-lvw overflow-hidden flex items-center justify-center'>
            <div className="shadow bg-white py-6 w-1/2 px-10">
                <div className='flex flex-col gap-4'>
                    <button onClick={closeModal} className='border border-gray-200 cursor-pointer items-start w-36 hover:bg-primary-500 py-2 hover:text-white px-3 hover:border-black bg-transparent text-black transition-all duration-1000'>Close Modal</button>
                    {children}
                </div>
            </div>  
        </div>
    )
}

export default Modal