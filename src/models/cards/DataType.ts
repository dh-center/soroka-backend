import { Table, Column, Model, AllowNull } from 'sequelize-typescript'

@Table
class DataType extends Model {
    @AllowNull(false)
    @Column
    name: string
}

export default DataType
