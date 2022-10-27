import FilledProperty from "../models/cards/FilledProperty"
import GeoProperty from "../models/cards/GeoProperty"
import DateCatalog from "../models/dates/DateCatalog"
import DataType from '../models/cards/DataType'
import Property from '../models/cards/Property'

async function deleteRelatedData(filledPropertyId: number) {
    try {
        await DateCatalog.destroy({where: {filledPropertyId: filledPropertyId}});
    } catch (e) {
        console.log("deleteRelatedDataError: ", e)
    }
}

async function fillRelatedData(instance: FilledProperty) {
    try {
        // Быстрая проверка на тип, чтобы не загружать БД запросами при bulkUpdate.
        if(instance.data.charAt(0) !== "{" && instance.data.charAt(0) !== "[") return;

        // Дополнительная проверка, если прошло первоначальную, + определние типа.
        const property: Property | null = await Property.findByPk(instance.propertyId)
        const dataType: DataType | null = await DataType.findByPk(property?.dataTypeId)
        if (dataType?.name !== "JULIAN_DATE" && dataType?.name !== "GEO_POINT") return;

        const data: any = JSON.parse(instance.data);
        const filledPropertyId = instance.id
        
        if (dataType?.name === "JULIAN_DATE") {
            await DateCatalog.destroy({where: {filledPropertyId: filledPropertyId}});

            for (const el of data) {
                if (!el.startJD) continue;
                const dateStart = el.startJD
                const dateEnd = el.endJD || el.startJD

                await DateCatalog.create({ dateStart, dateEnd, filledPropertyId })
            }
        }

        if (dataType?.name === 'GEO_POINT') {
            // Удалим все предыдущие гео-свойства
            await GeoProperty.destroy({ where: { filledPropertyId: instance.id } })

            // Сформируем массив с данными
            const geoData = data.map((prop: any) => {
                return { ...prop, filledPropertyId: instance.id }
            })

            // Создадим новые гео-свойства
            const results = await GeoProperty.bulkCreate(geoData)
            
            // Поле data свойства GeoProperty должно быть пустым в filledProperties.
            instance.data = "";
            await instance.save();
        }
    } catch (e) {
        console.log("fillRelatedDataError: ", e)
    }
}

async function retreiveRelatedData(instances: FilledProperty[]) {
        try {
            for (let prop of instances) {
                const dataType = prop.property.dataType.name;

                if (dataType === "GEO_POINT") {
                    let geoProps = prop.toJSON().geoProperty

                    for (let el of geoProps) delete el.location.crs

                    prop.data = geoProps
                }
            }                  
    } catch (e) {
        console.log("retreiveRelatedDataError: ", e)
    }
}

export {
    fillRelatedData,
    deleteRelatedData,
    retreiveRelatedData
}
