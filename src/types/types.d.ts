export type Header = {
    type: string;
    modifiable: boolean;
  };

export interface Headers {
  [name: string]: Header
}
  
  // Definición para cada registro de una tabla
  export type DataEntry = {
    [key: string | number]: string | number | Date;
  };
  
  // Una tabla
  export interface Table {
    headers: Headers;
    data: DataEntry[];
    erasable: boolean;
  }