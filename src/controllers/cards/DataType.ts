import DataTypeService from "../../services/cards/DataType"

class DataTypeController {
    private dataTypeService: DataTypeService

    constructor() {
        this.dataTypeService = new DataTypeService()
    }

    getAll = async (request: any, response: any) => {
        const dataTypeResponse = await this.dataTypeService.getAll()

        return response.status(dataTypeResponse.status).send(dataTypeResponse.detail)
    } 
}

export default DataTypeController
