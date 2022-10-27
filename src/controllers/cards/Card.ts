import { Request, Response } from "express"
import { ICardController, ICardService } from '../../interfaces'

class CardController implements ICardController {
    constructor (private cardService: ICardService) {
        this.cardService = cardService
    }

    getAll = async (request: Request, response: Response) => {
        const cardsResponse = await this.cardService.getAll(
            request.user,
            Number(request.query.limit) || null,
            Number(request.query.offset) || null
        )

        return response.send(cardsResponse)
    }

    getAllByFirstOrganization = async (request: Request, response: Response) => {
        const cardsResponse = await this.cardService.getAllById(
            1,
            Number(request.query.limit) || null,
            Number(request.query.offset) || null
        )

        return response.send(cardsResponse)
    }

    getAllByOrgId = async (request: Request, response: Response) => {
        const cardsResponse = await this.cardService.getAllById(
            Number(request.params.orgId),
            Number(request.query.limit) || null,
            Number(request.query.offset) || null
        )

        return response.send(cardsResponse)
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

    delete = async (request: Request, response: Response) => {
        const cardId = Number(request.params.cardId)

        const deletedCardResponse = await this.cardService.delete(request.user, cardId)

        return response.status(deletedCardResponse.status).send(deletedCardResponse.detail)
    }
}

export default CardController
