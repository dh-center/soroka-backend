import Property from '../../models/cards/Property'

class PropertyService {
    async getAll(): Promise<any> {
        const properties = await Property.findAll()

        return {
            detail: properties.map((property: Property) => property.toJSON()),
            status: 200
        }
    }
}

export default PropertyService