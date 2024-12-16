function capitalizeFirstLetter(input: string): string {
    if (!input) return input; // Manejar casos donde el string esté vacío
    return input.charAt(0).toUpperCase() + input.slice(1);
}

interface ModalTableProps {
    headers: [{}],
    entry: {},
    type: string
}

export default function ModalTable( { headers, entry, type }: ModalTableProps ){
    
    var modifiableIndices: number[] = []
    
    if (type == "update"){
        modifiableIndices = headers
            .map((header, index) => (header.modifiable ? index : -1))
            .filter(index => index !== -1);
    }
    
    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, index) => (
                    <th key={index} className="border-b px-4 py-2 bg-gray-300 text-center border-2">
                        {capitalizeFirstLetter(header.name)}
                    </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr key="unique-entry" className="border-b">
                    {Object.keys(entry).map((key, index) => (
                        <td key={key}>                        
                            {modifiableIndices.includes(index) ? (
                                <input
                                    type="text"
                                    placeholder={entry[key]}
                                    value={""}
                                    onChange={(e) => {
                                        const updatedEntry = { ...entry, [key]: e.target.value };
                                    }}
                                    className="px-2 py-1 rounded-md hover:bg-gray-200 selected:bg-gray-200"
                                />
                            ) : (
                                entry[key]
                            )}
                        </td>
                    ))}
                </tr>            
            </tbody>            
        </table>
    )
}