import { Table, Column, Model, AllowNull, HasMany, Scopes } from 'sequelize-typescript'
import Property from './Property'

@Scopes(() => ({
    short: {
        attributes: ['name']
    }
}))
@Table
class DataType extends Model {
    @AllowNull(false)
    @Column
    name: string

    @HasMany(() => Property)
    properties: Property[]
}

export default DataType
