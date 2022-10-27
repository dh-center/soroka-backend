import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey,
    DataType as DT,
    BelongsTo
} from 'sequelize-typescript'
import FilledProperty from './FilledProperty'

@Table({
    paranoid: true
})
class GeoProperty extends Model {
    @AllowNull(false)
    @Column(DT.GEOMETRY('POINT'))
    location: string

    @Column(DT.STRING(1000))
    name: string

    @AllowNull(false)
    @ForeignKey(() => FilledProperty)
    @Column
    filledPropertyId: number

    @BelongsTo(() => FilledProperty)
    filledProperty: FilledProperty
}

export default GeoProperty
