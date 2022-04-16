import fs from 'fs'
import ini from 'ini'
const configFile = fs.readFileSync('src/configs/settings.ini', 'utf-8')
const config = ini.parse(configFile)['DATABASE']

export default {
    development: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect
    },
    test: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect
    },
    production: {
        username: config.username,
        password: config.password,
        database: config.database,
        host: config.host,
        port: config.port,
        dialect: config.dialect
    }
}
