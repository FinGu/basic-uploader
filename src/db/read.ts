import postgres, { Sql } from "postgres"

import { db_function } from "../defs"

export type read_functions_type = {
    fetch_file: (file_id: string) => Promise<postgres.Row | undefined>,
    fetch_all_files: () => Promise<postgres.Row>
}

const read_functions: db_function = (db: Sql): read_functions_type => {
    return {
        fetch_file: async function(file_id: string): Promise<postgres.Row | undefined> {
            let files = await db`SELECT * FROM files WHERE real_id=${file_id}`

            if(files.length === 0){
                return undefined
            }

            let file = files[0]
            
            return file
        },

        fetch_all_files: async function(): Promise<postgres.Row>{
            return await db`SELECT * FROM files ORDER by id`
        }
    }
}

export default read_functions
