import { Request, Response } from "express"
import { IFileController, IFileService } from "../../interfaces"

// ONLY FOR MOCK
function generateFilesObject() {
    let lim = Math.floor(Math.random() * 7);
    let arr = [];
    let mainWasUsed = false;
    let types = ["png", "jpg", "gif"];

    for (let i = 0; i <= lim; i++) {
        let isMain = false;
        if (!mainWasUsed) {
            isMain = Math.random() > 0.75 ? true : false;
            mainWasUsed = isMain
        }
        arr.push({
            fileId: Math.floor(Math.random() * 1000000),
            type: types[Math.floor(Math.random() * 3)],
            isMain: isMain
        })
    }

    return arr;
}

class FileController implements IFileController {
    constructor(private fileService: IFileService) {
        this.fileService = fileService
    }

    upload = async (request: Request, response: Response) => {
        // const fileResponse = await this.fileService.upload(request.file)

        // return response
        //     .status(fileResponse.status)
        //     .send(fileResponse.detail)
        // ONLY FOR MOCK
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500))

        return response
            .status(200)
            .send(generateFilesObject())
    }

    delete = async (requrest: Request, response: Response) => {
        // ONLY FOR MOCK
        await new Promise(resolve => setTimeout(resolve, Math.random() * 500))

        return response
            .status(204)
            .send()
    }
}

export default FileController
