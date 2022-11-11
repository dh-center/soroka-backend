import { IFileService } from '../../interfaces'
import process from 'process'
import minioClient from '../../providers/minio'
import File from '../../models/files/File'

const bucketName: string = process.env.MINIO_BUCKET || 'soroka'

class FileService implements IFileService {
    
    async upload(files: any): Promise<any> {    
        try {  
            const responseArray = files.map((el: any) => {
                return {id: el.filename, type: el.mimetype, name: el.originalname, size: el.size}
            })
    
            return {
                detail: responseArray,
                status: 200
            }
        } catch(e) {
            console.log("fileService upload error: ", e)
        }
    }
    

    async get(fileId: string, fileName: string, user: any): Promise<any> {
        try {
            // privacy check
            const file = await File.findByPk(fileId)
            if (!file?.isPublic) return

            const stream = await minioClient.getObject(
                bucketName, 
                fileId)

            return {
                stream: stream,
                status: 200,
                headers: {
                    'Content-disposition': `filename=${fileName}`
                }
            }
        } catch(e) {
            console.log("error while getting a file: ", e)
        }
    }
}

export default FileService