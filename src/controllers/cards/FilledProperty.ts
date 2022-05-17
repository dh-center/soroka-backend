import FilledPropertyService from "../../services/cards/FilledProperty"

class FilledPropertyController {
    private filledPropertyService: FilledPropertyService

    constructor() {
        this.filledPropertyService = new FilledPropertyService()
    }

    getAll = async (request: any, response: any) => {
        const id = Number(request.params.cardId)

        if (!id) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        const filledPropertiesResponse = await this.filledPropertyService.getAll(id)

        return response
            .status(filledPropertiesResponse.status)
            .send(filledPropertiesResponse.detail)
    }

    create = async (request: any, response: any) => {
        const { cardId } = request.params

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

    delete = async (request: any, response: any) => {
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

    async update (request: any, response: any): Promise<any> {
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

    async getByPk (request: any, response: any): Promise<any> {
        const propertyId = Number(request.params.propertyId)

        if (propertyId > 0 && !propertyId) {
            return { detail: 'Property id is required param', status: 400 }
        }

        const propertyResponse = await this.filledPropertyService.getByPk(propertyId)

        return response
            .status(propertyResponse.status)
            .send(propertyResponse.detail)
    }
}

export default FilledPropertyController
