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
    console.error('Problema en la solicitud:', error);
    return {
      headers: [],
      data: [],
      erasable: true,
    };
  }

};

// Esta función borra un registro de una tabla de la BD
export async function deleteRow(entryId: string|number, tableName: string): Promise<{status: number, message: string}> {

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

    console.log(response)
    if (response.ok) {
      
      return {
        status: response.status,
        message: responseData.message
      }
    } else {
      return {
        status: response.status,
        message: responseData.error
      }
    }
  } catch(error){
    // Esta sección se ejecuta si hay un error en la solicitud al endpoint
    console.log("Error al hacer la solicitud al Endpoint!!! ", error as string);
    return {
        status: 500,
        message: `Problema al hacer la solicitud. Vuelve a intentarlo`
    }
  }

};

export async function updateRow(id: string, data: object, tableName: string){
  
  try{
    const response = await fetch(`/api/${tableName}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },      
        body: JSON.stringify({
          id: id,
          data: data
        }),
      }
    );

    const responseData = await response.json();

    console.log(response)
    if (response.ok) {
      
      return {
        status: response.status,
        message: responseData.message
      }
    } else {
      return {
        status: response.status,
        message: responseData.error
      }
    }
  } catch (e){
    console.log(e)
    return {
      status: 500,
      message: `Problema al hacer la solicitud. Vuelve a intentarlo`
    }    
  }

}

export async function createRow(data: object, tableName: string){
  
  console.log(tableName)
  
  try{
    const response = await fetch(`/api/${tableName}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },      
      body: JSON.stringify({
        data: data
      }),
    }) ;

    const responseData = await response.json();

    console.log(response)
    if (response.ok) {
      
      return {
        status: response.status,
        message: responseData.message
      }
    } else {
      return {
        status: response.status,
        message: responseData.error
      }
    }
  } catch (e){
    console.log(e)
    return {
      status: 500,
      message: `Problema al hacer la solicitud. Vuelve a intentarlo`      
    }
  }
}