import { handler_function } from "../defs"
import {database_function_type} from "../db/setup"

enum errors{
    success = 'success',
    file_not_found = 'file not found'
}

const handler = async (db_funcs: database_function_type, file_id?: string): Promise<string | any> => {
    if(file_id === undefined){
        return await db_funcs.fetch_all_files()
    }

    let file = await db_funcs.fetch_file(file_id) 

    if(file === undefined){
        return errors.file_not_found 
    }

    return file
}

const read_handler: handler_function = (db_funcs: database_function_type) => {
    return {
        error_enum: errors,
        handle: async function(file_id?: string): Promise<errors> {
            return handler(db_funcs, file_id)
        }
    } 
}

export default read_handler
