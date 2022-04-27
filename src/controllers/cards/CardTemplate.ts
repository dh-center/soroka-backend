import CardTemplate from '../../models/cards/CardTemplate'
import Property from '../../models/cards/Property'
import { Op } from 'sequelize'

class CardTemplateController {
    getAll = async (request: any, response: any) => {
        const cards: any = await CardTemplate.findAll()

        const cardsResponse: any = []

        for (const card of cards) {
            const cardObj = card.toJSON()

            // TODO: понять, почему необходимо дважды написать 
            // JSON.parse, чтобы вытащить массив
            const cardProps: number[] = JSON.parse(
                JSON.parse(card.propertiesList)
            )

            const propertiesList = await Property.findAll(
                { where: { id: { [Op.in]: cardProps } } }
            )

            cardObj.propertiesList = propertiesList

            cardsResponse.push(cardObj)
        }

        return response.send(cardsResponse)
    }

    getByPk = async (request: any, response: any) => {
        const { id } = request.params

        const card: any = await CardTemplate.findByPk(Number(id))

        const cardObj = card.toJSON()

        const cardProps: number[] = JSON.parse(
            JSON.parse(card.propertiesList)
        )

        const propertiesList = await Property.findAll(
            { where: { id: { [Op.in]: cardProps } } }
        )

        cardObj.propertiesList = propertiesList

        return response.send(cardObj)
    }
}

export default CardTemplateController
