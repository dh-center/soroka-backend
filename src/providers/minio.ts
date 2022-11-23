import * as minio from 'minio'
import minioConfig from "../configs/minio"
import process from 'process'

const minioClient = new minio.Client(minioConfig)
const bucketName = process.env.MINIO_BUCKET || 'soroka'

async function init() {
    try {
    // check if bucket is already created
    const status = await minioClient.bucketExists(bucketName);

    // if not - then create
    if (!status) {
        minioClient.makeBucket(bucketName, 'ru', async function(err: any) {
            if (err) return console.log(err)
            console.log('Bucket created successfully')
        });
    }
    
    } catch(e) {
        console.log("error in minio initialization: ", e)
    }
}

init();

export default minioClient