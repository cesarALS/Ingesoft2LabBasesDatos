import { getTable } from "@/utils/requestFunctions";
import { DataEntry, TableHeaders } from "@/types/types"
import { create } from "zustand"

type CRUDAction = null | "C" | "U" | "D";

interface TableManagementStore {
    loadingState:{
        isLoading: boolean,
        loadingMessage: string | null
    },
    modal: {
        isOpen: boolean,
        message: string | null,
        success: boolean | null,
    },
    CRUD: {
        currentAction: CRUDAction,
        currentEntry: null | DataEntry,        
    },    
    tableNames: string[],
    table: {
        tableName: string,
        headers: TableHeaders | object,
        data: DataEntry[],
        erasable: boolean,
    },
    setLoadingState: (isLoading: boolean, loadingMessage?: string) => void,
    setModal: (open: boolean, message?: string, success?: boolean) => void;
    setTable: (tableName: string) => Promise<void>,
    reloadTable: () => Promise<void>
    setCRUDAction: (action: CRUDAction, entry?: DataEntry) => void
}

const defaultTableManagementState = {
    loadingState: {
        isLoading: false,
        loadingMessage: null,
    },
    modal: {
        isOpen: false,
        message: null,
        success: null,
    },
    CRUD: {
        currentAction: null,    
        currentEntry: null,
    },    
    tableNames: ["departamento", "municipio", "vivienda", "persona"],
    table: {
        tableName: "departamento",
        headers: {},
        data: [],
        erasable: false,
    }
};

export const useTableManagementStore = create<TableManagementStore>((set, get) => ({
    ...structuredClone(defaultTableManagementState),
    setLoadingState(isLoading, loadingMessage?) {
        set(state => ({
            ...state,
            loadingState: {
                isLoading: isLoading,
                loadingMessage: (isLoading && loadingMessage) ? loadingMessage : null
            }
        }))
    },
    setModal(open, message, success) {
        if(!open) {
            set(state => ({
                ...state,
                modal: {
                    isOpen: false,
                    message: null,
                    success: null,
                }
            }));
        } else {
            if (!message || success === null || success === undefined){
                 console.error("Faltan argumentos en la función de establecer el Modal");
            }
            else {
                set(state => ({
                    ...state,
                    modal: {
                        isOpen: true,
                        message: message,
                        success: success,
                    },
                }));
            }
        }
    },
    async setTable(tableName: string){
        
        const { setLoadingState } = get();
        
        setLoadingState(true, "Cargando")      
                          
        const t = await getTable(tableName);

        set(state => ({
            ...state,
            table:{
                headers: t.headers,
                data: t.data,
                erasable: t.erasable,
                tableName: tableName,
            }
        }));

        setLoadingState(false);
        
    },
    async reloadTable(){
        get().setTable(get().table.tableName);
    },
    setCRUDAction(action, entry) {
        if(entry === undefined){
            if(action !== null) console.error("Para toda acción no nula, debe haber una entrada");
            else {
                set(state => ({
                    ...state,
                    CRUD: {
                        currentAction: null,
                        currentEntry: null
                    }
                }))
            }
        } else {
            if(action === null) console.log("Precaución: la acción es nula, por lo que se ignorará el entry proveído");            
            set(state => ({
                ...state,
                CRUD:{
                    currentEntry: action === null ? null : entry,
                    currentAction: action
                }
            }));
        }
        
    },
}))