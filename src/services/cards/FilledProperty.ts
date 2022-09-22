import { IFilledPropertyService } from '../../interfaces'
import Card, { FilledPropertyCard } from '../../models/cards/Card'
import FilledProperty from '../../models/cards/FilledProperty'

class FilledPropertyService implements IFilledPropertyService {
    async getAll(cardId: number): Promise<any> {
        try {
            const card: any = await Card.findByPk(cardId)

            const properties = await card.getProperties()

            return {
                detail: properties.map((property: FilledProperty) => property.toJSON()),
                status: 200
            }
        } catch (e) {
            return { detail: {"detail": "Not found"}, status: 404 }
        }
    }

    async create(cardId: number, filledPropertyData: any): Promise<any> {
        try {
            const createdProperty = await FilledProperty.create(filledPropertyData)

            await FilledPropertyCard.create({ filledPropertyId: createdProperty.id, cardId: Number(cardId) })

            return { detail: createdProperty, status: 200 }
        } catch (error) {
            return { detail: error, status: 400 }
        }
    }

    async delete(cardId: number, filledPropertyId: number): Promise<any> {
        try {
            const propertyCard = await FilledPropertyCard.findOne({ where: { cardId, filledPropertyId } });
            propertyCard?.destroy();

            const filledProperty = await FilledProperty.findByPk(filledPropertyId);
            filledProperty?.destroy();

            return { status: 204 }
        } catch (error) {
            return { detail: error, status: 400 }
        }
    }

    async update(propertyId: number, propertyData: any): Promise<any> {
        try {
            const updatedProperty: any = await FilledProperty.findByPk(propertyId)

            for (const key in propertyData) {
                updatedProperty[key] = propertyData[key]
            }

            await updatedProperty.save()

            return { detail: updatedProperty, status: 200 }
        } catch (e) {
            return { detail: e, status: 400 }
        }
    }

    async bulkUpdate(properties: any) {
        try {
            const updatedProperties = await FilledProperty.bulkCreate(
                properties,
                { updateOnDuplicate: ["propertyId", "data"] }
            )

            return { detail: updatedProperties, status: 200 }
        } catch (e) {
            return { detail: e, status: 400 }
        }
    }

    async bulkDelete(cardId: number, filledProperties: any) {
        try {
            for (const filledPropertyId of filledProperties) {
                await FilledPropertyCard.destroy({ where: { cardId, filledPropertyId } })
                const filledProperty = await FilledProperty.findByPk(filledPropertyId);
                filledProperty?.destroy();
            }

            return { status: 204 }
        } catch (error) {
            return { detail: error, status: 400 }
        }
    }

    async getByPk(propertyId: number): Promise<any> {
        try {
            const property: any = await FilledProperty.findByPk(propertyId)

            return { detail: property, status: 200 }
        } catch (e) {
            return { detail: { detail: e }, status: 400 }
        }
    }
}

export default FilledPropertyService
