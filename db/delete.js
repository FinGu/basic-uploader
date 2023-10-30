module.exports = (db) => {
    return {
        delete_file: async function(real_id) {
            await db`DELETE FROM files WHERE real_id=${real_id}`
        }
    }
}


