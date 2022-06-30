import FilledProperty from "../models/cards/FilledProperty"
import GeoProperty from "../models/cards/GeoProperty"
import DateCatalog from "../models/dates/DateCatalog"

async function fillRelatedData(instance: FilledProperty, dataType: string) {
    const isJulianDate = dataType === 'JULIAN_DATE'
    const isGeoProperty = dataType === 'GEO_POINT'

    const data: any = JSON.parse(instance.data)

    if (isJulianDate) {
        // FIXME: в будущем будут периоды дат и тд
        // сейчас просто заглушка для определения
        // даты начала и окончания
        const dateStart = data[0].jd
        const dateEnd = data[0].jd

        if (!dateStart) {
            return
        }

        const filledPropertyId = instance.id

        await DateCatalog.create({ dateStart, dateEnd, filledPropertyId })
    }

    if (isGeoProperty) {
        // FIXME в будущем сделать более оптимально

        // удалим все предыдущие гео-свойства
        await GeoProperty.destroy({ where: { filledPropertyId: instance.id } })

        // сформируем массив с данными
        const geoData = data.map((prop: any) => {
            return { ...prop, filledPropertyId: instance.id }
        })

        // создадим новые гео-свойства
        const results = await GeoProperty.bulkCreate(geoData)
        console.log('geo results', results)
    }
}

export {
    fillRelatedData
}
