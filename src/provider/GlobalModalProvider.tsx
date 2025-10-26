import React, { createContext, useCallback, useContext, useState } from 'react'

type ModalContexTypes = {
    isModalOpen:boolean,
    openModal:()=>void,
    closeModal : ()=>void
}

const ModalContext = createContext<ModalContexTypes | null>(null)

const GlobalModalProvider = ({children}:{children:React.ReactNode}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = useCallback(()=>{
        setIsModalOpen(true)
    },[])
    const closeModal = useCallback(()=>{
        setIsModalOpen(false)
    },[])

    const value={
        isModalOpen,
        openModal,
        closeModal
    }

    return (
        <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
    )
}

export const useModal = ()=>{
    const context = useContext(ModalContext)
    if(!context) {
        throw new Error('useMoldal must be used within a ModalContext');
    }
    return context
}

export default GlobalModalProvider