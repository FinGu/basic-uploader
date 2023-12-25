import { handler_function } from "../defs"
import utils from '../utils'
import cfg from '../config'

import fs from 'fs'

import {create_functions_type} from "../db/create"
import {database_function_type} from "../db/setup"

enum errors{
    success = 'success',
    file_upload_failure = 'file upload failure'
}

const handler = async (db_funcs: create_functions_type, file: Express.Multer.File) => {
    let real_id = utils.random_id()

    let full_path = cfg.uploads_folder + real_id

    const ws = fs.createWriteStream(full_path)

    let buf = file.buffer

    let hash = utils.get_md5(buf)

    await db_funcs.insert_file(real_id, full_path, file.originalname, hash, file.mimetype)

    ws.on('error', (err) => {
        return errors.file_upload_failure
    })

    ws.write(buf); 

    ws.end();    

    return errors.success
}

const create_handler: handler_function = (db_funcs: database_function_type) => {
    return {
        error_enum: errors,
        handle: async function(file): Promise<errors> {
            return handler(db_funcs, file)
        },
        create_uploads_folder: async function(): Promise<void> {
            fs.mkdir(cfg.uploads_folder, (err) => {})
        }
    } 
}

export default create_handler
