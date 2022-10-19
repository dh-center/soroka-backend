import { IFileService } from '../../interfaces'
// var Minio = require('minio')

// var minioClient = new Minio.Client({
//     endPoint: 'minio',
//     port: 9000,
//     useSSL: false,
//     accessKey: 'root',
//     secretKey: '123123123'
// });

class FileService implements IFileService {
    async delete(): Promise<any> {

        return {
            detail: "test",
            status: 200
        }
    }

    async upload(file: any): Promise<any> {
        // console.log("File: ", file)
        
        // let metaData = {
        //     'Content-Type': 'application/octet-stream',
        //     'X-Amz-Meta-Testing': 1234,
        //     'example': 5678
        // }

        // await minioClient.fPutObject('soroka',
        //     file.originalname,
        //     file.path, 
        //     metaData, 
        //     function(err: any, etag: any) {
        //         if (err) return console.log(err)
        //         console.log('File uploaded successfully.')
        // });

        // Make a bucket called europetrip.
        // await minioClient.makeBucket('soroka', 'us-east-1', async function(err: any) {
        //     console.log("started makeBucket")
        //     if (err) return console.log(err)
        //     console.log('Bucket created successfully in "us-east-1".')
        // });

        return {
            detail: "test",
            status: 200
        }
    }
}

export default FileService