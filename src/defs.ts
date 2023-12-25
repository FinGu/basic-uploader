import {Sql} from "postgres"
import {database_function_type} from "./db/setup"

type db_config = {
    username: string,
    password: string,

    port: number,
    host: string,
    
    database: string
}

type db_function = (sql: Sql) => any 

type handler_function = (db_funcs: database_function_type) => {
    error_enum: { [index: string]: string },
    handle: (...args: any[]) => Promise<any>,
    create_uploads_folder?: () => Promise<void>
}

export {db_config, db_function, handler_function}
