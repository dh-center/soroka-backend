import { IPropertyService } from '../../interfaces'
import Property from '../../models/cards/Property'

class PropertyService implements IPropertyService {
    async getAll(): Promise<any> {
        const properties = await Property.scope('detail').findAll()

        return {
            detail: properties,
            status: 200
        }
    }
}

export default PropertyService
