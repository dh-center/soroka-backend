import Property from '../../models/cards/Property'

class PropertyController {
    getAll = async (request: any, response: any) => {
        const properties = await Property.findAll()

        return response.send(properties.map((property: Property) => property.toJSON()))
    }
}

export default PropertyController
