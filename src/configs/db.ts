import process from "process"

const dbConfig = {
    development: {
        username: process.env.POSTGRES_USER || 'soroka',
        password: process.env.POSTGRES_PASSWORD || 'soroka',
        database: process.env.POSTGRES_DATABASE || 'soroka',
        host: process.env.DB_HOST || 'db',
        port: process.env.DB_PORT || 5432,
        dialect: process.env.DB_DIALECT || 'postgres'
    },
    test: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    },
    production: {
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT
    }
}

module.exports = dbConfig;
