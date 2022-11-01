import * as minio from 'minio'
import minioConfig from "../configs/minio"

const minioClient = new minio.Client(minioConfig)

async function init() {
    try {
    // check if bucket is already created
    const status = await minioClient.bucketExists("soroka");

    // if not - then create
    if (!status) {
        minioClient.makeBucket('soroka', 'ru', async function(err: any) {
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