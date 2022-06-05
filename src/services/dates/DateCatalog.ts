import FilledProperty from "../../models/cards/FilledProperty"
import DateCatalog from "../../models/dates/DateCatalog"
import { Op } from 'sequelize'

class DateCatalogService {
    async list(dateStart: number, dateEnd: number) {
        const filteredProperties = await DateCatalog.scope('properties').findAll({
            where: {
                dateStart: { [Op.gte]: dateStart },
                dateEnd: { [Op.lte]: dateEnd }
            } 
        })

        const filteredPropertiesIds = filteredProperties.map((prop) => prop.filledPropertyId)

        const propertiesList = await FilledProperty.findAll({
            where: {
                id: { [Op.in]: filteredPropertiesIds }
            }
        })

        return propertiesList
    }
}

export default DateCatalogService
