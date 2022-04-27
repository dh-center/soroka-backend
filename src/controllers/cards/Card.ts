import Card, { FilledPropertyCard } from '../../models/cards/Card'

class CardController {
    getAll = async (request: any, response: any) => {
        const cards: any = await Card.findAll()

        const cardsResponse = [] 
        
        for (const card of cards) {
            const cardObj = card.toJSON()

            const props = await card.getProperties()

            cardObj.propertiesList = props.map(
                (prop: FilledPropertyCard) => prop.toJSON()
            )

            cardsResponse.push(cardObj)
        }

        return response.send(cardsResponse)
    }

    create = async (request: any, response: any) => {
        const createdCard = await Card.create(request.body)

        return response.send(createdCard)
    }

    getByPk = async (request: any, response: any) => {
        const { cardId } = request.params

        const card = await Card.findByPk(Number(cardId))

        return response.send(card)
    }

    update = async (request: any, response: any) => {
        const { cardId } = request.params

        const updatedCard: any = await Card.findByPk(Number(cardId))

        for (const key in request.body) {
            updatedCard[key] = request.body[key]
        }

        updatedCard.save()

        return response.send(updatedCard)
    }
}

export default CardController
