import CardService from '../../services/cards/Card'

class CardController {
    private cardService: CardService

    constructor () {
        this.cardService = new CardService()
    }

    getAll = async (request: any, response: any) => {
        const cardsList = await this.cardService.getAll(request.user)

        return response.send(cardsList)
    }

    create = async (request: any, response: any) => {
        const createdCard = await this.cardService.create(request.user, request.body)

        return response.status(createdCard.status).send(createdCard.detail)
    }

    getByPk = async (request: any, response: any) => {
        const cardId = Number(request.params.cardId)

        const cardResponse = await this.cardService.getByPk(cardId)

        return response.status(cardResponse.status).send(cardResponse.detail)
    }

    update = async (request: any, response: any) => {
        const cardId = Number(request.params.cardId)

        const updatedCardResponse = await this.cardService.update(cardId, request.body)

        return response.status(updatedCardResponse.status).send(updatedCardResponse.detail)
    }
}

export default CardController
