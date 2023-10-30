module.exports = (db) => {
    return {
        fetch_file: async function(file_id) {
            let file = await db`SELECT * FROM files WHERE real_id=${file_id}`

            if(file.length === 0){
                return null
            }

            file = file[0]
            
            return file
        },

        fetch_all_files: async function(){
            return await db`SELECT * FROM files ORDER by id`
        }

    }
}
