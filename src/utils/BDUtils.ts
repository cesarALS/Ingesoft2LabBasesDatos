// Esta función sirve para los formularios, dado que toma el tipo de dato
// que bota la BD, y lo convierte en una entrada válida para "type" de 
// un form
export function getFormType(BDType: string){
    
    var type: string

    switch(BDType){
        case "integer":
            type = "number";
            break;
        case "double precision":
            type = "number";
            break;
        case "bigint":
            type="number";
            break;
        case "character varying":
            type = "text";
            break;
        case "date":
            type = "date";
            break;
        default:
            type = "text";
            break;
    }
    return type;
}