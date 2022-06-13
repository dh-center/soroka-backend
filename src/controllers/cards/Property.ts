import PropertyService from "../../services/cards/Property"
import { Request, Response } from "express"

class PropertyController {
    private propertyService: PropertyService

    constructor() {
        this.propertyService = new PropertyService()
    }

    getAll = async (request: Request, response: Response) => {
        const propertiesResponse = await this.propertyService.getAll()

        return response
            .status(propertiesResponse.status)
            .send(propertiesResponse.detail)
    }
}

export default PropertyController
