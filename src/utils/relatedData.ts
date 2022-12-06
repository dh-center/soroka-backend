import FilledProperty from "../models/cards/FilledProperty"
import GeoProperty from "../models/cards/GeoProperty"
import DateCatalog from "../models/dates/DateCatalog"
import DataType from '../models/cards/DataType'
import Property from '../models/cards/Property'
import File from '../models/files/File'
import minioClient from '../providers/minio'
import Card, { FilledPropertyCard } from "../models/cards/Card"
import process from 'process'
import { MINIO_HOSTNAME } from '../configs/constants'

const bucketName = process.env.MINIO_BUCKET || 'soroka'

async function deleteRelatedData(filledProperty: FilledProperty) {
    try {
        DateCatalog.destroy({ where: { filledPropertyId: filledProperty.id }})

        File.destroy({ where: { field_id: filledProperty.id }, force: true})
            .then(res => {
                if (res) {
                    // Если были удаленные файлы, то удалим их и из Минио
                    const files: File[] = filledProperty.toJSON().file
                    const fileIds: string[] = files.map(el => el.id)

                    minioClient.removeObjects(bucketName, fileIds) 
                }
            })
        
        GeoProperty.destroy({ where: { filledPropertyId: filledProperty.id }})
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
            // @@@ Удаление файлов
            // Построим массив id существовавших до обновления файлов
            const otherFiles: File[] = await File.findAll({where: {field_id: filledPropertyId}, paranoid: false})
            let previousIds: string[] = otherFiles.map((el: File) => el.id)
            // Построим массив id файлов, которые нужно загрузить
            let actualIds: string[] = data.files.map((el: File) => el.id)
            // Если в старом массиве был id файла, а в новом массиве его нет, то оставляем, чтобы потом удалить по id
            previousIds = previousIds.filter((item) => !actualIds.includes(item))
            // Удалим файлы с оставшимися ID, так как они не были сохранены, значит, юзер их удалил
            await minioClient.removeObjects(bucketName, previousIds) // Удалим из файлового хранилища

            // Удалим из таблицы файлов все прежние записи перед добавлением новых во избежание конфликтов
            await File.destroy({where: {field_id: filledPropertyId}, force: true})

            // Добавим в хранилище пришедшие файлы
            for (const el of data.files) {
                 // Передаем файлы в minio
                try {
                    await minioClient.fPutObject(bucketName,
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
                        owner_id: owner_id,
                        type: el.type
                    })
                } catch(e) {
                    console.log("error while uploading (minio): ", e)
                }
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

async function fillCardCoverData(instance: Card) {
    for (const el of instance.toJSON().properties) {
        if (el.file.length) {
            for (const file of el.file) {
                if (file.id === instance.cover) {
                    instance.cover = JSON.stringify({
                        ...file,
                        url: "" + MINIO_HOSTNAME + process.env.API_PREFIX  + "/files/by-id/" + file.id + "/" + file.name
                    })
                }
            }
        }
    }
}

export {
    fillRelatedData,
    deleteRelatedData,
    retreiveRelatedData,
    fillCardCoverData
}