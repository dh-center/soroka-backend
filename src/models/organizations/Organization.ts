import { Table, Column, Model, AllowNull } from 'sequelize-typescript'

@Table
class Organization extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    address: string
}

export default Organization
