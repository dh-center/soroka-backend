import { Table, Column, Model, AllowNull, ForeignKey, Scopes, DataType as DT } from 'sequelize-typescript'
import FilledProperty from '../cards/FilledProperty'

@Scopes(() => ({
    properties: {
        attributes: ['filledPropertyId']
    }
}))
@Table({
    paranoid: true
})
class DateCatalog extends Model {
    @AllowNull(false)
    @Column(DT.FLOAT)
    dateStart: string

    @AllowNull(false)
    @Column(DT.FLOAT)
    dateEnd: string

    @AllowNull(false)
    @ForeignKey(() => FilledProperty)
    @Column
    filledPropertyId: number
}

export default DateCatalog
