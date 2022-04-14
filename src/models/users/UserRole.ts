import { Table, Column, Model, AllowNull } from 'sequelize-typescript'

@Table
class UserRole extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    key: string
}

export default UserRole
