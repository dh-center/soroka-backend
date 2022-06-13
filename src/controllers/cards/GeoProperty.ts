import GeoPropertyService from "../../services/cards/GeoProperty"
import { Request, Response } from "express"

class GeoPropertyController {
    private GeoPropertyService: GeoPropertyService

    constructor() {
        this.GeoPropertyService = new GeoPropertyService()
    }

    getAll = async (request: Request, response: Response) => {
        const GeoPropertyResponse = await this.GeoPropertyService.getAll()

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail)
    }

    create = async (request: Request, response: Response) => {
        const GeoPropertyResponse = await this.GeoPropertyService.create(request.body)

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail)
    }

    getByPk = async (request: Request, response: Response) => {
        const propertyId = Number(request.params.propertyId)

        const GeoPropertyResponse = await this.GeoPropertyService.getByPk(propertyId)

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail) 
    }

    update = async (request: Request, response: Response) => {
        const propertyId = Number(request.params.propertyId)

        const GeoPropertyResponse = await this.GeoPropertyService.update(propertyId, request.body)

        return response.status(GeoPropertyResponse.status).send(GeoPropertyResponse.detail) 
    }
}

export default GeoPropertyController
