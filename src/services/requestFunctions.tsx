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

// Esta función borra un registro de una tabla de la BD
export async function deleteRow(entryId: string, tableName: string): Promise<{status: number, message: string}> {

  try {
    
    console.log(`Enviamos el request DELETE al Endpoint, con id ${entryId}, de la tabla ${tableName}`);
    
    //Especificamos el ID del registro a borrar en los parámetros de la búsqueda (después de ?)
    const response = await fetch(`/api/${tableName}?id=${entryId}`,{  
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
    });
    
    // Esta sección se ejecuta si la consulta llegó al endpoint, y por lo tanto en el endpoint, o se 
    // pudo borrar, o no se pudo (jeje) Si no se pudo, se ejecuta el catch
    
    const responseData = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        message: `Registro con Identificador ${entryId} Borrado con éxito`
      }
    } else {
      return {
        status: response.status,
        message: `No se pudo borrar, porque: ${response.status}: ${responseData.message}`
      }
    }
  } catch(error){
    // Esta sección se ejecuta si hay un error en la solicitud al endpoint
    console.error("Error al hacer la solicitud al Endpoint!!! ", error.message);
    return {
        status: 500,
        message: `Error al hacer la solicitud. Vuelve a intentarlo`
    }
  }

};