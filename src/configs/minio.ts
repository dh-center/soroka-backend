const minioConfig = {
    endPoint: 'minio',
    port: 9000,
    useSSL: false,
    accessKey: process.env.MINIO_ACCESS || 'soroka',
    secretKey: process.env.MINIO_SECRET || 'soroka'
}

export default minioConfig