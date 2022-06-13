import { IGeoPropertyService } from '../../interfaces'
import GeoProperty from '../../models/cards/GeoProperty'

class GeoPropertyService implements IGeoPropertyService {
    async getAll(): Promise<any> {
        const geoProperties = await GeoProperty.findAll()

        return {
            detail: geoProperties,
            status: 200
        }
    }

    async create(propertyData: any): Promise<any> {
        try {
            const createdProperty = await GeoProperty.create(propertyData)

            return { status: 200, detail: createdProperty }
        } catch (e) {
            return { status: 400, detail: e }
        }
    }

    async getByPk(propertyId: number): Promise<any> {
        try {
            const property = await GeoProperty.findByPk(propertyId)

            return { status: 200, detail: property }
        } catch (e) {
            return { status: 400, detail: e }
        }
    }

    async update(propertyId: number, propertyData: any): Promise<any> {
        if (propertyId > 0 && !propertyId) {
            return { detail: 'Card id is required param', status: 400 }
        }

        try {
            const updatedProperty: any = await GeoProperty.findByPk(propertyId)

            for (const key in propertyData) {
                updatedProperty[key] = propertyData[key]
            }

            await updatedProperty.save()

            return { status: 200, detail: updatedProperty }
        } catch (e) {
            return { status: 400, detail: e }
        }
    }
}

export default GeoPropertyService
