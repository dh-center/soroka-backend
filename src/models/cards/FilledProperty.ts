import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey,
    BelongsToMany,
    DataType as DT,
    BeforeUpdate
} from 'sequelize-typescript'
import Card, { FilledPropertyCard } from './Card'
import DataType from './DataType'
import DateCatalog from '../dates/DateCatalog'
import Property from './Property'

@Table
class FilledProperty extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @ForeignKey(() => Property)
    @Column
    propertyId: number

    @Column(DT.JSON)
    data: string

    @BelongsToMany(() => Card, () => FilledPropertyCard)
    cardsList: Card[]

    @BeforeUpdate
    static async onJulianDateChanged(instance: FilledProperty) {
        // FIXME: добавить BelongsTo во всех связанных моделях
        // чтобы делать запросы через related getter
        const property = await Property.findByPk(instance.propertyId)
        const dataType = await DataType.findByPk(property?.dataTypeId)

        const isJulianDate = dataType?.name === 'JULIAN_DATE'

        if (isJulianDate) {
            const data: any = JSON.parse(instance.data)

            // FIXME: в будущем будут периоды дат и тд
            // сейчас просто заглушка для определения
            // даты начала и окончания
            const dateStart = data[0].jd
            const dateEnd = data[0].jd

            const filledPropertyId = instance.id

            await DateCatalog.create({ dateStart, dateEnd, filledPropertyId })
        }
    }
}

export default FilledProperty
