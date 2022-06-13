import { Request, Response } from "express"
import { ICardController, ICardService } from '../../interfaces'

class CardController implements ICardController {
    constructor (private cardService: ICardService) {
        this.cardService = cardService
    }

    getAll = async (request: Request, response: Response) => {
        const cardsList = await this.cardService.getAll(request.user)

        return response.send(cardsList)
    }

    create = async (request: Request, response: Response) => {
        const createdCard = await this.cardService.create(request.user, request.body)

        return response.status(createdCard.status).send(createdCard.detail)
    }

    getByPk = async (request: Request, response: Response) => {
        const cardId = Number(request.params.cardId)

        const cardResponse = await this.cardService.getByPk(cardId)

        return response.status(cardResponse.status).send(cardResponse.detail)
    }

    update = async (request: Request, response: Response) => {
        const cardId = Number(request.params.cardId)

        const updatedCardResponse = await this.cardService.update(cardId, request.body)

        return response.status(updatedCardResponse.status).send(updatedCardResponse.detail)
    }
}

export default CardController
