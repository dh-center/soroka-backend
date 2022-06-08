import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey,
    DataType as DT
} from 'sequelize-typescript'
import FilledProperty from './FilledProperty'

@Table
class GeoProperty extends Model {
    @AllowNull(false)
    @Column(DT.GEOMETRY('POINT'))
    location: string

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @ForeignKey(() => FilledProperty)
    @Column
    filledPropertyId: number
}

export default GeoProperty
