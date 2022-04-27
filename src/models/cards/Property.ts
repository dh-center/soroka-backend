import { Table, Column, Model, AllowNull, ForeignKey } from 'sequelize-typescript'
import DataType from './DataType'

@Table
class Property extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @ForeignKey(() => DataType)
    @Column
    dataTypeId: number

    @AllowNull(false)
    @Column
    isLink: boolean
}

export default Property
