export type Header = {
    name: string;
    type: string;
    modifiable: boolean;
  };
  
  // Definición para cada registro de una tabla
  export type DataEntry = {
    [key: string | number]: string | number | Date;
  };
  
  // Una tabla
  export interface Table {
    headers: Header[];
    data: DataEntry[];
    erasable: boolean;
  }