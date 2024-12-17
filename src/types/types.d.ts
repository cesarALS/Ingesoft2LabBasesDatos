export type TableHeader = {
    type: string;
    modifiable: boolean;
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