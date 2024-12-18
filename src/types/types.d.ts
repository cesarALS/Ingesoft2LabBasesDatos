export type AttributeConstraints = {
  minLength: number
  maxLength: number
  min: number
  max: number
  pattern: string
}

export type TableHeader = {
    type: string    
    modifiable: boolean
    constraints: AttributeConstraints | null
    possibleValues: string[] | number[] | null
    isPrimaryKey: boolean // Si la llave primaria está compuesta de más, no importa: se muestra como id
};

export interface TableHeaders {
  [name: string]: TableHeader
}
  
// Definición para cada registro de una tabla
export type DataEntry = {
  [key: string | number]: string | number | Date;
};
  
// Una tabla
export interface Table {
  headers: TableHeaders;
  data: DataEntry[];
  erasable: boolean;
}