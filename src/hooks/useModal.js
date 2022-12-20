import { useState } from "react"

const useModal = ()=>{
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = ()=>{
        setIsOpen(!isOpen);
    }

    return {
        isOpen,
        handleChange
    }
}

export default useModal