import ModalTable from "@/components/atoms/2.ModalTable"  

interface ModalContentProps{
    title: string,
    headers: [{}],
    entry: {},
    confirmAction: Function,
    cancelAction: Function,
    firstButton: {text: string, color: string, hoverColor: string}
}

export default function ModalContent( {
    title, headers, entry, confirmAction, cancelAction, firstButton } : ModalContentProps
){
    
    return(
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                {title}
            </h2>    
            <ModalTable headers = {headers} entry = {entry} />
            <div className="flex justify-center gap-6">
                <button
                onClick={confirmAction}
                className={`${firstButton.color} hover:${firstButton.hoverColor} text-white px-4 py-2 rounded`}
                >
                {firstButton.text}
                </button>
                <button
                onClick={cancelAction}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                Cancelar
                </button>
            </div>
        </>
    );


}

