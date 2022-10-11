import express from "express"
import formidable from "express-formidable"
import { parse } from "csv-parse/sync"
import fs from "fs"
import Card, { FilledPropertyCard } from "../../../models/cards/Card"
import Property from "../../../models/cards/Property"
import FilledPropertyService from "../../../services/cards/FilledProperty"

class JulianDate {
    date: Date

    // julian constants
    private JULIAN_1970 = 2440588
    private DAY_IN_MS = 1000 * 60 * 60 * 24

    constructor(date: Date) {
        this.date = date
    }

    getJulianDate = () => {
        return this.date.valueOf() / this.DAY_IN_MS - 0.5 + this.JULIAN_1970
    }
}

class Controller {
    import = async (request: any, response: any): Promise<any> => {
        const csvFile = request.files.csvFile

        const csvFileData = fs.readFileSync(csvFile.path)

        const cards = parse(csvFileData, {
            columns: true,
            skip_empty_lines: true,
            delimiter: ';'
        })

        const geoPointProp = await Property.findOne({ where: { name: 'geoPoint' } })
        const cyteProp = await Property.findOne({ where: { name: 'quote' } })
        const julianDateProp = await Property.findOne({ where: { name: 'julianDate' } })
        const sourceProp = await Property.findOne({ where: { name: 'sources' } })
        const tagsProp = await Property.findOne({ where: { name: 'tags' } })
        const annotationProp = await Property.findOne({ where: { name: 'annotation' } })

        const CALENDAR_TYPES = {
            gregorian: 1,
            julian: 2
        }

        for (const card of cards) {
            const cardData = {
                name: card.description,
                organizationId: 1,
                userId: 1,
                preventDelete: false
            }

            const geoPropertyData = {
                propertyId: geoPointProp?.id,
                data: [{
                    name: card.place,
                    location: {
                        type: "Point",
                        coordinates: card.coords.split(',').map(
                            (coord: string) => parseFloat(coord)
                        )
                    }
                }]
            }

            const julianDate = new JulianDate(
                new Date(`${card.year}-${card.month}-${card.day}`)
            )

            const calendarRow: "julian" | "gregorian" = card.calendar

            const calendar = CALENDAR_TYPES[calendarRow]

            const datePropertyData = {
                propertyId: julianDateProp?.id,
                data: [{ startJD: julianDate.getJulianDate(), calendar }]
            }

            // Временно убраны цитаты, т.к. в текущем CSV они не заполнены.
            // const cytePropertyData = {
            //     data: card.cyte,
            //     propertyId: cyteProp?.id
            // }

            const sourcePropertyData = {
                data: card.source,
                propertyId: sourceProp?.id
            }

            const tagsPropertyData = {
                data: card.tags,
                propertyId: tagsProp?.id
            }

            const annotationPropertyData = {
                data: card.annotation,
                propertyId: annotationProp?.id
            }
            
            const service = new FilledPropertyService();

            // создадим одним запросом все остальные свойства
            const createdFilledProps = await service.bulkUpdate(
                [
                    // Временно убраны цитаты, т.к. в текущем CSV они не заполнены.
                    datePropertyData, // cytePropertyData,
                    sourcePropertyData, tagsPropertyData,
                    annotationPropertyData, geoPropertyData
                    
                ]
            )
            
            // создадим карточку
            const createdCard = await Card.create(cardData)

            // запишем все свойства в карточку
            if (Array.isArray(createdFilledProps.detail)) {
                const filledProps = createdFilledProps.detail.map(
                    (prop: any) => { return { filledPropertyId: prop.id, cardId: createdCard.id } }
                )
                await FilledPropertyCard.bulkCreate(filledProps)
            }
        }

        
        return response.send({ ok: true })
    }
}

const controller = new Controller()

const router: express.Router = express.Router()

router.route('/import-csv')
    .post(formidable(), controller.import)

export default router
