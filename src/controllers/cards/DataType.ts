import DataType from '../../models/cards/DataType'

class DataTypeController {
    getAll = async (request: any, response: any) => {
        const dataTypes = await DataType.findAll()

        return response.send(dataTypes.map((dataType: DataType) => dataType.toJSON()))
    } 
}

export default DataTypeController
