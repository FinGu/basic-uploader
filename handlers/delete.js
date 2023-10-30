module.exports = (db_funcs, fs) => {
    return {
        error_enum: {
            success: 'success',
            file_not_found: 'file not found',
            delete_failure: 'failure to delete file'
        },

        handle: async function(file_id){
            let error_enum = this.error_enum

            let file = await db_funcs.fetch_file(file_id)

            if(file === null){
                return error_enum.file_not_found 
            }

            fs.unlink(file.location, (err) => {
                if(err){
                    return error_enum.delete_failure
                }
            })

            await db_funcs.delete_file(file_id)

            return error_enum.success
        }
    }
}

