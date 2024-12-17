interface ModalContentMessageProps {
    title: string,
    message: string,
    acceptHandle: Function 
}

export default function ModalContentMessage ( {title, message, acceptHandle } : ModalContentMessageProps){
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                {title}
            </h2>
            <p>
                {message}
            </p> 
            <button
            onClick={acceptHandle}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"                        
            >                            
                Ok
            </button>    
        </>
    );
}