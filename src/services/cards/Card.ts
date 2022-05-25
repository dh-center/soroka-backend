import Card from "../../models/cards/Card"
import FilledProperty from "../../models/cards/FilledProperty"

class CardService {
    async getAll (user: any): Promise<any> {
        const ALLOWED_ROLES = ['ADMIN', 'EDITOR']

        if (!user) {
            return []
        }

        const hasPermission = ALLOWED_ROLES.includes(user.userRole.key)

        const filters = hasPermission ? {} : { organizationId: user.organization }

        const cards: any = await Card.findAll({ where: {...filters} })

        const cardsList = [] 
        
        for (const card of cards) {
            const cardObj = card.toJSON()

            let props = await card.getProperties()

            props = props.map((prop: FilledProperty) => {
                const { id, name, propertyId, data } = prop

                return { id, name, propertyId, data }
            })

            cardObj.propertiesList = props

            cardObj.propertiesList = props.map(
                (prop: FilledPropertyCard) => prop.toJSON()
            )

            cardsList.push(cardObj)
        }

        return cardsList
    }

    async create (cardData: any): Promise<any> {
        try {
            const createdCard = await Card.create(cardData)

            return { detail: createdCard, status: 200 }
        } catch (e) {
            return { detail: e, status: 400 }
        }
    }

    async getByPk (cardId: number): Promise<any> {
        if (cardId > 0 && !cardId) {
            return { detail: 'Card id is required param', status: 400 }
        }

        try {
            const card = await Card.findByPk(cardId)

            if (!card) {
                throw new Error('not found')
            }

            return { detail: card, status: 200 }
        } catch (e) {
            return { detail: 'not found', status: 404 }
        }
    }

    async update (cardId: number, cardData: any): Promise<any> {
        if (cardId > 0 && !cardId) {
            return { detail: 'Card id is required param', status: 400 }
        }

        try {
            const updatedCard: any = await Card.findByPk(cardId)

            for (const key in cardData) {
                updatedCard[key] = cardData[key]
            }

            await updatedCard.save()

            return { detail: updatedCard, status: 200 }
        } catch (e) {
            return { detail: e, status: 400 }
        }
    }
}

export default CardService
