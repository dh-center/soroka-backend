import Card, { FilledPropertyCard } from '../../models/cards/Card'
import FilledProperty from '../../models/cards/FilledProperty'

class FilledPropertyController {
    getAll = async (request: any, response: any) => {
        const id = Number(request.params.cardId)

        if (!id) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        try {
            const card: any = await Card.findByPk(id)

            const properties = await card.getProperties()

            return response.send(properties.map((property: FilledProperty) => property.toJSON()))
        } catch (e) {
            return response.status(404).send({"detail": "Not found"})
        }
    }

    create = async (request: any, response: any) => {
        const { cardId } = request.params

        if (!cardId) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        const createdProperty = await FilledProperty.create(request.body)

        await FilledPropertyCard.create({ filledPropertyId: createdProperty.id, cardId: Number(cardId) })

        return response.send(createdProperty)
    }

    delete = async (request: any, response: any) => {
        const cardId = Number(request.params.cardId)

        if (!cardId) {
            return response.status(400).send({"detail": "Card ID is required param"})
        }

        const { filledPropertyId } = request.body

        await FilledPropertyCard.destroy({ where: { cardId, filledPropertyId } })

        return response.status(204).send()
    }

    async update (request: any, response: any): Promise<any> {
        const propertyId = Number(request.params.propertyId)

        if (propertyId > 0 && !propertyId) {
            return { detail: 'Property id is required param', status: 400 }
        }

        const propertyData = request.body

        try {
            const updatedProperty: any = await FilledProperty.findByPk(propertyId)

            for (const key in propertyData) {
                updatedProperty[key] = propertyData[key]
            }

            await updatedProperty.save()

            return response.send(updatedProperty)
        } catch (e) {
            return response.status(400).send({ detail: e })
        }
    }

    async getByPk (request: any, response: any): Promise<any> {
        const propertyId = Number(request.params.propertyId)

        if (propertyId > 0 && !propertyId) {
            return { detail: 'Property id is required param', status: 400 }
        }

        try {
            const property: any = await FilledProperty.findByPk(propertyId)

            return response.send(property)
        } catch (e) {
            return response.status(400).send({ detail: e })
        }
    }
}

export default FilledPropertyController
