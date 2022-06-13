import { Request, Response } from "express"
import { ICardTemplateController, ICardTemplateService } from "../../interfaces"

class CardTemplateController implements ICardTemplateController {
    constructor (private cardTemplateService: ICardTemplateService) {
        this.cardTemplateService = cardTemplateService
    }

    getAll = async (request: Request, response: Response) => {
        const cardsResponse = await this.cardTemplateService.getAll()

        return response.status(cardsResponse.status).send(cardsResponse.detail)
    }

    getByPk = async (request: Request, response: Response) => {
        const id = Number(request.params.id)

        const cardResponse = await this.cardTemplateService.getByPk(id)

        return response.status(cardResponse.status).send(cardResponse.detail)
    }
}

export default CardTemplateController
