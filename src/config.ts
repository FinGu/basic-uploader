import { db_config } from './defs'

type config = {
    port: number,
    database: db_config,
    uploads_folder: string
}

const cfg: config = {
    port: 3000,
    database: {
        username: 'fabioc',
        password: '',
        port: 5432,
        host: 'localhost',
        database: 'etes'
    },
    uploads_folder: __dirname + '/files/' 
}

export default cfg
