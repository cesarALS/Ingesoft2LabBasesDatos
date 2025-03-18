import { FaCheckCircle } from 'react-icons/fa'; // Importar ícono de check (éxito)
import { FaTimesCircle } from 'react-icons/fa'; // Importar ícono de cruz (error)

interface ModalContentMessageProps {
    title: string,
    message: string,
    acceptHandle: () => void,
    success: boolean
}

export default function ModalContentMessage ( {title, message, acceptHandle, success } : ModalContentMessageProps){
    console.log("Success")
    console.log(success)
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                {title}
            </h2>
            <div className='flex justify-center items-center'>
                {success ? (
                    <FaCheckCircle className="text-green-500 text-6xl"/>
                ) : (
                    <FaTimesCircle className="text-red-500 text-6xl"/>
                )}                
            </div>
            <div className="text-center text-[1.1em]">
                <p>
                    {message}
                </p>
            </div>
            <div className='w-[35%] border-2'>
                <button
                onClick={acceptHandle}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 w-full"                        
                >                            
                    Ok
                </button>                   
            </div>

 
        </>
    );
}