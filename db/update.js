module.exports = (db) => {
    return {
        update_file: async function(real_id, location, original_name, hash, mimetype) {
            await db`UPDATE files SET location=${location}, original_name=${original_name}, hash=${hash}, mimetype=${mimetype} WHERE real_id=${real_id}`
        }
    }
}

