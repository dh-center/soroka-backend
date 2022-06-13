import DataTypeService from "../../services/cards/DataType"
import { Request, Response } from "express"

class DataTypeController {
    private dataTypeService: DataTypeService

    constructor() {
        this.dataTypeService = new DataTypeService()
    }

    getAll = async (request: Request, response: Response) => {
        const dataTypeResponse = await this.dataTypeService.getAll()

        return response.status(dataTypeResponse.status).send(dataTypeResponse.detail)
    } 
}

export default DataTypeController
