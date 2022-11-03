import FilledProperty from "../models/cards/FilledProperty"
import GeoProperty from "../models/cards/GeoProperty"
import DateCatalog from "../models/dates/DateCatalog"
import DataType from '../models/cards/DataType'
import Property from '../models/cards/Property'
import File from '../models/files/File'
import minioClient from '../providers/minio'
import CardService from "../services/cards/Card"
import Card, { FilledPropertyCard } from "../models/cards/Card"

async function deleteRelatedData(filledPropertyId: number) {
    try {
        await DateCatalog.destroy({ where: { filledPropertyId }});
        await File.destroy({ where: { field_id: filledPropertyId }});
        await GeoProperty.destroy({ where: { filledPropertyId }})
    } catch (e) {
        console.log("deleteRelatedDataError: ", e)
    }
}

async function fillRelatedData(instance: FilledProperty, cardId?: number) {
    try {
        // Быстрая проверка на тип, чтобы не загружать БД запросами при bulkUpdate.
        if(instance.data.charAt(0) !== "{" && instance.data.charAt(0) !== "[") return;

        // Дополнительная проверка, если прошло первоначальную, + определние типа.
        const property: Property | null = await Property.findByPk(instance.propertyId)
        const dataType: DataType | null = await DataType.findByPk(property?.dataTypeId)
        if (dataType?.name !== "JULIAN_DATE"
        && dataType?.name !== "GEO_POINT"
        && dataType?.name !== "FILE") return;

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

        if (dataType?.name === 'FILE') {
            for (const el of data.files) {
                // TODO реализовать удаление так, чтобы id не терялся, но и не повторялся (это PK)
                const file = await File.findByPk(el.id, { paranoid: false });
                await file?.destroy({force: true})

                // Передаем файлы в minio
                await minioClient.fPutObject('soroka',
                el.id,
                "uploads/" + el.id,
                function(err: any, etag: any) {
                    if (err) return console.log(err)
                    console.log('File uploaded successfully.')
                });

                // Узнаем owner по номеру карты
                let owner_id: number, card: any;
        
                if (!cardId) {
                    // В этом случае не получили cardId, найдем его сами. Маршруты: update, bulkUpdate
                    const filledPropertyCard: any = await FilledPropertyCard.findByPk(filledPropertyId) 
                    cardId = await filledPropertyCard?.cardId
                }
                
                card = await Card.findByPk(cardId)
                owner_id = card?.userId
                
                // Добавляем файлы в таблицу Files. 
                await File.create({ 
                    name: el.name, 
                    id: el.id,
                    field_id: filledPropertyId,
                    isPublic: true,
                    size: el.size,
                    owner_id: owner_id
                })
            }

            // Поле "дата" содержит только номер главного файла, если он есть.
            if (data.main) {
                instance.data = data.main
            } else {
                instance.data = "";
            }

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
                    prop.data = JSON.stringify(geoProps)
                }

                if (dataType === "FILE") {
                    const object = {
                        files: prop.toJSON().file,
                        main: prop.data
                    }
                    prop.data = JSON.stringify(object);
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
