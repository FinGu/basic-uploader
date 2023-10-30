module.exports = (db_funcs, fs, utils) => {
    return {
        error_enum: {
            success: 'success',
            file_not_found: 'file not found',
            file_upload_failure: 'failure to upload file'
        },

        handle: async function(file_id, new_file){
            let error_enum = this.error_enum

            let file = await db_funcs.fetch_file(file_id) 

            if(file === null){
                return error_enum.file_not_found 
            }

            const ws = fs.createWriteStream(file.location)

            let buf = new_file.buffer

            let hash = utils.get_md5(buf)

            await db_funcs.update_file(file_id, file.location, new_file.originalname, hash, new_file.mimetype)

            ws.on('error', (err) => {
                return error_enum.file_upload_failure
            })

            ws.write(buf); 

            ws.end();    

            return error_enum.success
        }
    }
}



