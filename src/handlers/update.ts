import { handler_function } from "../defs"
import utils from '../utils'

import fs from 'fs'
import {database_function_type} from "../db/setup"

enum errors{
    success = 'success',
    file_not_found = 'file not found',
    file_upload_failure = 'failure to upload file'
}

const handler = async (db_funcs: database_function_type, new_file: any, file_id: string): Promise<string | any> => {
    let file = await db_funcs.fetch_file(file_id) 

    if(!file){
        return errors.file_not_found 
    }

    const ws = fs.createWriteStream(file.location)

    let buf = new_file.buffer

    let hash = utils.get_md5(buf)

    await db_funcs.update_file(file_id, file.location, new_file.originalname, hash, new_file.mimetype)

    ws.on('error', (err) => {
        return errors.file_upload_failure
    })

    ws.write(buf); 

    ws.end();    

    return errors.success
}

const update_handler: handler_function = (db_funcs: database_function_type) => {
    return {
        error_enum: errors,
        handle: async function(file_id: string, new_file): Promise<errors> {
            return handler(db_funcs, new_file, file_id)
        }
    } 
}

export default update_handler
