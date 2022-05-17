import CardTemplate from "../../models/cards/CardTemplate"
import Property from '../../models/cards/Property'
import { Op } from 'sequelize'

class CardTemplateService {
    async getAll(): Promise<any> {
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

        return { detail: cardsResponse, status: 200 }
    }
    
    async getByPk(id: number): Promise<any> {
        try {
            const card: any = await CardTemplate.findByPk(id)

            const cardObj = card.toJSON()

            const cardProps: number[] = JSON.parse(
                JSON.parse(card.propertiesList)
            )

            const propertiesList = await Property.findAll(
                { where: { id: { [Op.in]: cardProps } } }
            )

            cardObj.propertiesList = propertiesList

            return { detail: cardObj, status: 200 }
        } catch (error) {
            return { detail: 'Not found', status: 404 }
        }
    } 
}

export default CardTemplateService
