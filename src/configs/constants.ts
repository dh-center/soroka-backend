import process from 'node:process'

const API_PREFIX = process.env.API_PREFIX || "/restapi/v1"
const MINIO_HOSTNAME = process.env.MINIO_HOSTNAME || 'https://soroka.f128.science'

export {
    API_PREFIX,
    MINIO_HOSTNAME
}