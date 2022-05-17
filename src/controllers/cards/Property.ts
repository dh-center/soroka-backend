import PropertyService from "../../services/cards/Property"

class PropertyController {
    private propertyService: PropertyService

    constructor() {
        this.propertyService = new PropertyService()
    }

    getAll = async (request: any, response: any) => {
        const propertiesResponse = await this.propertyService.getAll()

        return response
            .status(propertiesResponse.status)
            .send(propertiesResponse.detail)
    }
}

export default PropertyController
