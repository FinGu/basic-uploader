module.exports = (postgres, cfg) => {
    try{
        const sql = postgres({
            host: cfg.database.host,
            port: cfg.database.port,
            database: cfg.database.details.name,
            username: cfg.database.username,
            password: cfg.database.password
        })

        return {
            db: sql,
            ...require('./create')(sql), 
            ...require('./read')(sql),
            ...require('./update')(sql),
            ...require('./delete')(sql)
        }
    } catch(error){
        return null
    }
}
