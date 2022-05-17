import DataType from '../../models/cards/DataType'

class DataTypeService {
    async getAll(): Promise<any> {
        const dataTypes = await DataType.findAll()

        return {
            detail: dataTypes.map((dataType: DataType) => dataType.toJSON()),
            status: 200
        }
    }
}

export default DataTypeService
