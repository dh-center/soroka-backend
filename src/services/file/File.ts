import { IFileService } from '../../interfaces'
import fs from 'fs'

class FileService implements IFileService {
    async upload(files: any): Promise<any> {      
        const responseArray = files.map((el: any) => {
            return {id: el.filename, type: el.mimetype, name: el.originalname, size: el.size}
        })

        return {
            detail: responseArray,
            status: 200
        }
    }
}

export default FileService