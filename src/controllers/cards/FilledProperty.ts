import FilledPropertyService from "../../services/cards/FilledProperty"
import { Request, Response } from "express"

class FilledPropertyController {
    private filledPropertyService: FilledPropertyService

    constructor() {
        this.filledPropertyService = new FilledPropertyService()
    }

    getAll = async (request: Request, response: Response) => {
        const cardId = Number(request.params.cardId)

        if (!cardId) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        const filledPropertiesResponse = await this.filledPropertyService.getAll(cardId)

        return response
            .status(filledPropertiesResponse.status)
            .send(filledPropertiesResponse.detail)
    }

    create = async (request: Request, response: Response) => {
        const cardId = Number(request.params.cardId)

        if (!cardId) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        const createdPropertyResponse = await this.filledPropertyService.create(
            cardId, request.body
        )
     
        return response
            .status(createdPropertyResponse.status)
            .send(createdPropertyResponse.detail)
    }

    delete = async (request: Request, response: Response) => {
        const cardId = Number(request.params.cardId)

        if (!cardId) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        const filledPropertyId = Number(request.body.filledPropertyId)

        const deletedPropertyResponse = await this.filledPropertyService.delete(
            cardId, filledPropertyId
        )

        return response
            .status(deletedPropertyResponse.status)
            .send(deletedPropertyResponse.detail)
    }

    update = async (request: Request, response: Response): Promise<any> => {
        const propertyId = Number(request.params.propertyId)

        if (propertyId > 0 && !propertyId) {
            return { detail: 'Property id is required param', status: 400 }
        }

        const propertyData = request.body

        const updatedPropertyResponse = await this.filledPropertyService
            .update(propertyId, propertyData)
        
        return response
            .status(updatedPropertyResponse.status)
            .send(updatedPropertyResponse.detail)
    }

    getByPk = async (request: Request, response: Response): Promise<any> => {
        const propertyId = Number(request.params.propertyId)

        if (propertyId > 0 && !propertyId) {
            return { detail: 'Property id is required param', status: 400 }
        }

        const propertyResponse = await this.filledPropertyService.getByPk(propertyId)

        return response
            .status(propertyResponse.status)
            .send(propertyResponse.detail)
    }

    bulkUpdate = async (request: Request, response: Response): Promise<any> => {
        const { properties } = request.body

        const propertiesResponse = await this.filledPropertyService.bulkUpdate(properties)

        return response
            .status(propertiesResponse.status)
            .send(propertiesResponse.detail)
    }

    bulkDelete = async (request: Request, response: Response): Promise<any> => {
        const cardId = Number(request.params.cardId)

        if (!cardId) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        const { properties } = request.body

        const propertiesResponse = await this.filledPropertyService.bulkDelete(cardId, properties)

        return response
            .status(propertiesResponse.status)
            .send(propertiesResponse.detail)
    }
}

export default FilledPropertyController
