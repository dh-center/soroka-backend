import process from 'process'

const API_PREFIX = process.env.API_PREFIX || "/restapi/v1"
const HOSTNAME = getHostname();

function getHostname() {
    if (process.env.NODE_ENV === 'development') {
        return 'https://soroka.f128.science'
    } else if (process.env.NODE_ENV === 'production') {
        return 'https://soroka.wunder-kammer.ru'
    }
}

export {
    API_PREFIX,
    HOSTNAME
}
