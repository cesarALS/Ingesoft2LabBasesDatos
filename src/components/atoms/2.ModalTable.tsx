function capitalizeFirstLetter(input: string): string {
    if (!input) return input; // Manejar casos donde el string esté vacío
    return input.charAt(0).toUpperCase() + input.slice(1);
}

interface ModalTableProps {
    headers: [{}],
    entry: {}
}

export default function ModalTable( { headers, entry }: ModalTableProps ){
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
                {Object.keys(entry).map((key) => (
                    <td key={key} className="text-center px-4 py-2">
                        {entry[key]}
                    </td>
                ))}
                </tr>              
            </tbody>            
        </table>
    )
}