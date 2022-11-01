import { ICardService } from "../../interfaces"
import Card from "../../models/cards/Card"
import UserRole from "../../models/users/UserRole"
import paginate from "../../utils/paginate"
import { retreiveRelatedData } from "../../utils/relatedData"

class CardService implements ICardService {
    async getAll (user: any, limit?: number, offset?: number): Promise<any> {
        const ALLOWED_ROLES = ['ADMIN', 'EDITOR']

        let hasPermission = null;
        let filters = {}
        
        // Временное решение для noAuth маршрутов. Когда они будут отключены, вернуть, как было.
        if (user) {
            const userRole: any = await UserRole.findByPk(user.userRole);
            hasPermission = ALLOWED_ROLES.includes(userRole.key);
            filters = hasPermission ? {} : { organizationId: user.organization }
        }

        const cards: any = await paginate(Card.scope('detail'), filters, limit, offset)

        const cardsList = [] 
        
        for (const card of cards.results) {
            const cardObj = {
                id: card.id,
                name: card.name,
                userId: card.userId,
                organizationId: card.organizationId,
                preventDelete: card.preventDelete,
                createdAt: card.createdAt,
                updatedAt: card.updatedAt,
                propertiesList: [],
                isFilled: null
            }

            let props = card.properties

            // fill with geoProperty data
            retreiveRelatedData(props)

            props = props.map((prop: any) => {
                const { id, propertyId, data } = prop

                return { id, propertyId, data }
            })

            cardObj.propertiesList = props

            cardObj.isFilled = props.every(
                (prop: any) => prop.data && prop.data.length > 0
            )

            cardsList.push(cardObj)
        }

        return {
            total: cards.total,
            results: cardsList,
            hasNextPage: cards.hasNextPage
        }
    }

    async getAllById (orgId: number, limit?: number, offset?: number): Promise<any> {
        if (!Number.isInteger(orgId) || orgId < 0) {
            return { detail: 'Invalid organization id', status: 400 }
        }

        const filters = { organizationId: orgId }

        const cards: any = await paginate(Card.scope('detail'), filters, limit, offset)

        const cardsList = [] 
        
        for (const card of cards.results) {
            const cardObj = {
                id: card.id,
                name: card.name,
                userId: card.userId,
                organizationId: card.organizationId,
                preventDelete: card.preventDelete,
                createdAt: card.createdAt,
                updatedAt: card.updatedAt,
                propertiesList: [],
                isFilled: null
            }

            let props = card.properties
            
            // fill with geoProperty data
            retreiveRelatedData(props)

            props = props.map((prop: any) => {
                const { id, propertyId, data } = prop

                return { id, propertyId, data }
            })

            cardObj.propertiesList = props

            cardObj.isFilled = props.every(
                (prop: any) => prop.data && prop.data.length > 0
            )

            cardsList.push(cardObj)
        }

        return {
            total: cards.total,
            results: cardsList,
            hasNextPage: cards.hasNextPage
        }
    }

    async create (user: any, cardData: any): Promise<any> {
        try {
            if (!cardData.userId && !cardData.organizationId) {
                cardData.userId = user.id
                cardData.organizationId = user.organization
            }

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
