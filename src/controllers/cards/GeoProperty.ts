import { Request, Response } from "express"
import { IGeoPropertyController, IGeoPropertyService } from "../../interfaces"

class GeoPropertyController implements IGeoPropertyController {
    constructor(private geoPropertyService: IGeoPropertyService) {
        this.geoPropertyService = geoPropertyService
    }

    getAll = async (request: Request, response: Response) => {
        const GeoPropertyResponse = await this.geoPropertyService.getAll()

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail)
    }

    create = async (request: Request, response: Response) => {
        const GeoPropertyResponse = await this.geoPropertyService.create(request.body)

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail)
    }

    getByPk = async (request: Request, response: Response) => {
        const propertyId = Number(request.params.propertyId)

        const GeoPropertyResponse = await this.geoPropertyService.getByPk(propertyId)

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail) 
    }

    update = async (request: Request, response: Response) => {
        const propertyId = Number(request.params.propertyId)

        const GeoPropertyResponse = await this.geoPropertyService.update(propertyId, request.body)

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail) 
    }
}

export default GeoPropertyController
