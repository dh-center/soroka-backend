const minioConfig = {
    endPoint: 'minio',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ROOT_USER || 'soroka',
    secretKey: process.env.MINIO_ROOT_PASSWORD || 'soroka123'
}

export default minioConfig