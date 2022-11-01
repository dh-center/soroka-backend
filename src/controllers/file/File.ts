import { Request, Response } from "express"
import { IFileController, IFileService } from "../../interfaces"

class FileController implements IFileController {
    constructor(private fileService: IFileService) {
        this.fileService = fileService
    }

    upload = async (request: Request, response: Response) => {
        const fileResponse = await this.fileService.upload(request.files)

        return response
            .status(fileResponse.status)
            .send(fileResponse.detail)
    }

    delete = async (request: Request, response: Response) => {
        const fileResponse = await this.fileService.delete(request.params.fileId)
        
        return response
            .status(204)
            .send()
    }
}

export default FileController
