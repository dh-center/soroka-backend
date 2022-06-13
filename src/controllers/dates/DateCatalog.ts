import { Request, Response } from "express"
import { IDateCatalogController, IDateCatalogService } from "../../interfaces"

class DateCatalogController implements IDateCatalogController {
    constructor(private dateCatalogService: IDateCatalogService) {
        this.dateCatalogService = dateCatalogService
    }

    list = async (request: Request, response: Response) => {
        const dateStart = Number(request.query.dateStart)
        const dateEnd = Number(request.query.dateEnd)

        const properties = await this.dateCatalogService.list(dateStart, dateEnd)

        return response.send(properties)
    }
}

export default DateCatalogController
