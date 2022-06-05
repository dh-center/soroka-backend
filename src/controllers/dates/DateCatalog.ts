import { Request, Response } from "express"
import DateCatalogService from '../../services/dates/DateCatalog'

class DateCatalogController {
    private dateCatalogService: DateCatalogService

    constructor() {
        this.dateCatalogService = new DateCatalogService()
    }

    list = async (request: Request, response: Response) => {
        const dateStart = Number(request.query.dateStart)
        const dateEnd = Number(request.query.dateEnd)

        const properties = await this.dateCatalogService.list(dateStart, dateEnd)

        return response.send(properties)
    }
}

export default DateCatalogController
