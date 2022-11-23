import { Table, Column, Model, AllowNull, ForeignKey, HasMany, Scopes, BelongsTo } from 'sequelize-typescript'
import DataType from './DataType'
import FilledProperty from './FilledProperty'

@Scopes(() => ({
    dataType: {
        include: [DataType.scope('short')],
        attributes: ['id', 'name']
    },
    detail: {
        include: [DataType.scope('short')],
        attributes: [
            ['id', 'propertyId'],
            'name', 'isLink'
        ]
    },
    short: {
        include: [DataType.scope('short')],
        attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'isLink']}
    }
}))
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

    @HasMany(() => FilledProperty)
    filledProperties: FilledProperty[]

    @BelongsTo(() => DataType)
    dataType: DataType
}

export default Property

