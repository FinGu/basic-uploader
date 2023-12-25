import postgres, {Sql} from "postgres"

import {db_config} from "../defs"

import create_handler, {create_functions_type} from './create'
import read_handler, {read_functions_type} from './read'
import update_handler, {update_functions_type} from './update'
import delete_handler, {delete_functions_type} from './delete'

//this is the type that encompasses all the functions in the impl 
export type database_function_type = 
    create_functions_type & 
    read_functions_type & 
    update_functions_type & 
    delete_functions_type

const get_database_functions = (sql: Sql): database_function_type | undefined => {
    try{
        return {
            ...create_handler(sql),
            ...read_handler(sql),
            ...update_handler(sql),
            ...delete_handler(sql)
        }
    } catch(error){
        return undefined
    }
};

export default (cfg: db_config) => {
    const sql = postgres(cfg)

    let functions = get_database_functions(sql)

    if(!functions){
        return functions 
    }

    return {
        db: sql,
        ...functions
    }
}
