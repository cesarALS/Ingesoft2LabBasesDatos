// Las funciones por medio de las cuales se puede hacer el pedido a las APIS

import { Table } from "@/types/types"

// Esta función hace la búsqueda asincrónica a la base de datos:
export async function getTable(table: string): Promise<Table> {

  try {
    const response = await fetch(`/api/${table}`);
    
    if (response.ok) {
      const data = await response.json(); // Esto convierte la respuesta a un objeto JavaScript
      return {
        headers: data.headers,
        data: data.data,
        erasable: data.erasable,
      };
    } else {
      console.error('Error al obtener los datos:', response.statusText);
      return {
        headers: [],
        data: [],
        erasable: true,
      };
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {
      headers: [],
      data: [],
      erasable: true,
    };
  }

};