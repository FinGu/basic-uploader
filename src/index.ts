import cfg from './config'
import express from 'express'
import multer from 'multer'
import fs from 'fs'

const app = express()
const upload_app = multer({})

app.use('/css', express.static(__dirname + '/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/bootstrap/dist/js'))

app.use(express.static(__dirname + '/views/'))

import setup_db_get_functions from './db/setup'

let database_functions = setup_db_get_functions(cfg.database)

if(!database_functions){
    console.log('Failure initializing the database')
    process.exit()
}

database_functions.create_table()

import setup_create_handler from './handlers/create'
const create_handler = setup_create_handler(database_functions)

create_handler.create_uploads_folder!()

app.post('/create', upload_app.single('file'), (req, res) => {
    create_handler.handle(req.file).then((result) => {
        res.send({
            success: result === create_handler.error_enum.success,
            response: result
        })
    })
})

import setup_read_handler from './handlers/read'
const read_handler = setup_read_handler(database_functions)

app.get('/read', (req, res) => {
    read_handler.handle().then((result) => {
        res.send({
            success: Array.isArray(result),
            response: result
        })
    })
})

app.get('/read/:id', (req, res) => {
    let id = req.params.id

    read_handler.handle(id).then(result => {
        res.send({
            success: typeof result === 'object',
            response: result
        })
    })
})

app.get('/view/:id', (req, res) => {
    let id = req.params.id

    read_handler.handle(id).then(result => {
        if(typeof result !== 'object'){
            res.send({
                success: false,
                response: result
            })

            return
        }

        res.setHeader('Content-Type', result.mimetype)

        const stream = fs.createReadStream(result.location)

        stream.pipe(res)
    })
})

import setup_update_handler from './handlers/update'
const update_handler = setup_update_handler(database_functions)

app.post('/update/:id', upload_app.single('file'), (req, res) => {
    let id = req.params.id;

    update_handler.handle(id, req.file).then(result => {
        res.send({
            success: result === update_handler.error_enum.success,
            response: result
        })
    })
})

import setup_delete_handler from './handlers/delete'
const delete_handler = setup_delete_handler(database_functions)

app.get('/delete/:id', (req, res) => {
    let id = req.params.id;

    delete_handler.handle(id).then(result => {
        res.send({
            success: result === create_handler.error_enum.success,
            response: result
        }) 
    });
})

app.listen(cfg.port, () => {
    console.log('Server started')
})
