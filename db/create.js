module.exports = (db) => {
    return {
        create_table: async function(){
            await db`CREATE TABLE IF NOT EXISTS files (
                id SERIAL PRIMARY KEY, 
                real_id varchar(255) NOT NULL,
                location varchar(500) NOT NULL,
                original_name varchar(255) NOT NULL,
                hash varchar(64) NOT NULL,
                mimetype varchar(255) NOT NULL
            )` 
        },

        insert_file: async function(real_id, location, original_name, hash, mimetype) {
            await db`INSERT INTO files (real_id, location, original_name, hash, mimetype) VALUES(${real_id}, ${location}, ${original_name}, ${hash}, ${mimetype})`
        }
    }
}

