import CardTemplateService from "../../services/cards/CardTemplate"

class CardTemplateController {
    private cardTemplateService: CardTemplateService

    constructor () {
        this.cardTemplateService = new CardTemplateService()
    }

    getAll = async (request: any, response: any) => {
        const cardsResponse = await this.cardTemplateService.getAll()

        return response.status(cardsResponse.status).send(cardsResponse.detail)
    }

    getByPk = async (request: any, response: any) => {
        const id = Number(request.params.id)

        const cardResponse = await this.cardTemplateService.getByPk(id)

        return response.status(cardResponse.status).send(cardResponse.detail)
    }
}

export default CardTemplateController
