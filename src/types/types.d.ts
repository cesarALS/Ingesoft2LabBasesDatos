export type AttributeConstraints = {
  minLength: number
  maxLength: number
  min: number
  max: number
  pattern: string
}

export type TableHeader = {
    type: string    
    modifiable: boolean // Si se puede actualizar el atributo en el registro
    constraints: AttributeConstraints | null
    possibleValues: string[] | number[] | null //Si el valor está limitado a un rango, ese rango
    isPrimaryKey: boolean // Si la llave primaria está compuesta de más, no importa: se muestra como id
    choosableInCreate: boolean //Si se puede elegir en crear (la única excepción parecen ser las llaves primarias autoincrementales)
};

export interface TableHeaders {
  [name: string]: TableHeader
}
  
// Definición para cada registro de una tabla
export type DataEntry = {
  id: string | number,
  [key: string]: string | number;
};
  
// Una tabla
export interface Table {
  headers: TableHeaders | object ;
  data: DataEntry[];
  erasable: boolean;
}