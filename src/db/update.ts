import { Sql } from "postgres"

import { db_function } from "../defs"

export type update_functions_type = {
    update_file: (real_id: string, location: string, original_name: string, hash: string, mimetype: string) => Promise<void>
}

const update_functions: db_function = (db: Sql): update_functions_type => {
    return {
        update_file: async function(real_id: string, location: string, original_name: string, hash: string, mimetype: string): Promise<void> {
            await db`UPDATE files SET location=${location}, original_name=${original_name}, hash=${hash}, mimetype=${mimetype} WHERE real_id=${real_id}`
        }
    }
}

export default update_functions;
