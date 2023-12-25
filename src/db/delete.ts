import { Sql } from "postgres"

import { db_function } from "../defs"

export type delete_functions_type = {
    delete_file: (real_id: string) => Promise<void>
}

const delete_functions: db_function = (db: Sql): delete_functions_type => {
    return {
        delete_file: async function(real_id: string): Promise<void> {
            await db`DELETE FROM files WHERE real_id=${real_id}`
        }
    }
}

export default delete_functions;
