import { Sql } from "postgres"

import { db_function } from "../defs"

export type create_functions_type = {
    create_table: () => Promise<void>,
    insert_file: (real_id: string, location: string, original_name: string, hash: string, mimetype: string) => Promise<void>
}

const create_functions: db_function = (db: Sql): create_functions_type => {
    return {
        create_table: async function(): Promise<void> {
            await db`CREATE TABLE IF NOT EXISTS files (
                id SERIAL PRIMARY KEY, 
                real_id varchar(255) NOT NULL,
                location varchar(500) NOT NULL,
                original_name varchar(255) NOT NULL,
                hash varchar(64) NOT NULL,
                mimetype varchar(255) NOT NULL
            )` 
        },

        insert_file: async function(real_id: string, location: string, original_name: string, hash: string, mimetype: string): Promise<void> {
            await db`INSERT INTO files (real_id, location, original_name, hash, mimetype) VALUES(${real_id}, ${location}, ${original_name}, ${hash}, ${mimetype})`
        }
    }
}

export default create_functions;
