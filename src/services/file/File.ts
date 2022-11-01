import { IFileService } from '../../interfaces'
import File from '../../models/files/File'

class FileService implements IFileService {
    async delete(fileId: string): Promise<any> {
        // try {
        //     // найти файл и удалить из таблицы файлов
        //     await File.destroy({where: {id: fileId}})

        //     return {
        //         status: 204
        //     }
        // } catch (e) {
        //     return { detail: e, status: 400 }
        // } 
    }

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