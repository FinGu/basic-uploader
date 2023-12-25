import { handler_function } from "../defs"

import fs from 'fs'
import {database_function_type} from "../db/setup"

enum errors{
    success = 'success',
    file_not_found = 'file not found',
    delete_failure = 'failure to delete file'
}

const handler = async (db_funcs: database_function_type, file_id: string) => {
    let file = await db_funcs.fetch_file(file_id)

    if(!file){
        return errors.file_not_found 
    }

    fs.unlink(file.location, (err) => {
        if(err){
            return errors.delete_failure
        }
    })

    await db_funcs.delete_file(file_id)

    return errors.success
}

const delete_handler: handler_function = (db_funcs: database_function_type) => {
    return {
        error_enum: errors,
        handle: async function(file_id: string): Promise<errors> {
            return handler(db_funcs, file_id)
        }
    } 
}

export default delete_handler
