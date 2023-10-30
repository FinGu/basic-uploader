const cfg = require('./config')
const postgres = require('postgres')

const express = require('express')
const multer  = require('multer')

const utils = require('./utils')
const fs = require('fs')

const app = express()
const upload_app = multer({})

app.use('/css', express.static('node_modules/bootstrap/dist/css'))
app.use('/js', express.static('node_modules/bootstrap/dist/js'))

app.use(express.static('views'))

let database_functions = require('./db/setup')(postgres, cfg)

if(database_functions === null){
    console.log('Failure initializing the database')
    process.exit()
}

database_functions.create_table()

const create_handler = require('./handlers/create')(database_functions, fs, utils, cfg);

create_handler.create_uploads_folder(cfg)
app.post('/create', upload_app.single('file'), (req, res) => {
    create_handler.handle(req.file).then((result) => {
        res.send({
            success: result === create_handler.error_enum.success,
            response: result
        })
    })
})

const read_handler = require('./handlers/read')(database_functions);
app.get('/read', (req, res) => {
    read_handler.handle().then(result => {
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


const update_handler = require('./handlers/update')(database_functions, fs, utils);
app.post('/update/:id', upload_app.single('file'), (req, res) => {
    let id = req.params.id;

    update_handler.handle(id, req.file).then(result => {
        res.send({
            success: result === update_handler.error_enum.success,
            response: result
        })
    })
})

const delete_handler = require('./handlers/delete')(database_functions, fs);
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
