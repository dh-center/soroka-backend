import { Request, Response } from "express"
import { IFileController, IFileService } from "../../interfaces"

const bucketName: string = process.env.MINIO_BUCKET || 'soroka'

class FileController implements IFileController {
    constructor(private fileService: IFileService) {
        this.fileService = fileService
    }

    upload = async (request: Request, response: Response) => {
        try {
            const fileResponse = await this.fileService.upload(request.files)

            return response
                .status(fileResponse.status)
                .send(fileResponse.detail)
        } catch(e) {
            return response
                .status(404)
                .send(e)
        }
    }

    get = async (request: Request, response: Response) => {
        try {
            const fileResponse = await this.fileService.get(request.params.fileId, request.params.fileName, request.user)

            if (!fileResponse.stream) return response.status(404)

            response.writeHead(fileResponse.status, fileResponse.headers)

            fileResponse.stream.pipe(response)
        } catch(e) {
            console.log("error in file get controller: ", e)
            return response
                .status(404)
                .send(e)
        }
    }
}

export default FileController
