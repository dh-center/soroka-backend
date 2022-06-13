import { Request, Response } from "express"
import { IDataTypeController, IDataTypeService } from "../../interfaces"

class DataTypeController implements IDataTypeController {
    constructor(private dataTypeService: IDataTypeService) {
        this.dataTypeService = dataTypeService
    }

    getAll = async (request: Request, response: Response) => {
        const dataTypeResponse = await this.dataTypeService.getAll()

        return response.status(dataTypeResponse.status).send(dataTypeResponse.detail)
    } 
}

export default DataTypeController
