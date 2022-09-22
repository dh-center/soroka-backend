import FilledProperty from "../models/cards/FilledProperty"
import GeoProperty from "../models/cards/GeoProperty"
import DateCatalog from "../models/dates/DateCatalog"

async function deleteRelatedData(filledPropertyId: number) {
    try {
        await DateCatalog.destroy({where: {filledPropertyId: filledPropertyId}});
    } catch (e) {
        console.log("deleteRelatedDataError: ", e)
    }
}

async function fillRelatedData(instance: FilledProperty, dataType: string, method: string) {
    const isJulianDate = dataType === 'JULIAN_DATE'
    const isGeoProperty = dataType === 'GEO_POINT'

    const data: any = instance.data;

    if (isJulianDate) {
        for (const el of data) {
            try {
                if (!el.startJD) continue;
                const dateStart = el.startJD
                const dateEnd = el.endJD || el.startJD
                const filledPropertyId = instance.id
    
                if (method === "update") {
                    await DateCatalog.destroy({where: {filledPropertyId: filledPropertyId}});
                    await DateCatalog.create({ dateStart, dateEnd, filledPropertyId })
                } else if (method === "create") {
                    await DateCatalog.create({ dateStart, dateEnd, filledPropertyId })
                }
            } catch (e) {
                console.log("fillRelatedDataDateError:", e);
            }
        } 
    }

    if (isGeoProperty) {
        // FIXME в будущем сделать более оптимально
        try {
            // удалим все предыдущие гео-свойства
            await GeoProperty.destroy({ where: { filledPropertyId: instance.id } })

            // сформируем массив с данными
            const geoData = data.map((prop: any) => {
                return { ...prop, filledPropertyId: instance.id }
            })

            // создадим новые гео-свойства
            const results = await GeoProperty.bulkCreate(geoData)
            console.log('geo results', results)
        } catch (e) {
            console.log("fillRelatedDataGeoError: ", e)
        }
            
    }
}

export {
    fillRelatedData,
    deleteRelatedData
}
