module.exports = (db_funcs) => {
    return {
        error_enum: {
            success: 'success',
            file_not_found: 'file not found'
        },

        handle: async function(file_id = null){
            let error_enum = this.error_enum

            if(file_id === null){
                return await db_funcs.fetch_all_files()
            }

            let file = await db_funcs.fetch_file(file_id) 

            if(file === null){
                return error_enum.file_not_found 
            }

            return file
        }
    }
}


