module.exports = (db_funcs, fs, utils, cfg) => {
    return {
        error_enum: {
            success: 'success',
            file_upload_failure: 'file upload failure'
        },

        create_uploads_folder: async function() {
            fs.mkdir(cfg.uploads_folder, (err) => {})
        },

        handle: async function(file){
            let error_enum = this.error_enum
            
            let real_id = utils.random_id()

            let full_path = cfg.uploads_folder + real_id

            const ws = fs.createWriteStream(full_path)

            let buf = file.buffer

            let hash = utils.get_md5(buf)

            await db_funcs.insert_file(real_id, full_path, file.originalname, hash, file.mimetype)

            ws.on('error', (err) => {
                return error_enum.file_upload_failure
            })

            ws.write(buf); 

            ws.end();    

            return error_enum.success
        }
    }
}
