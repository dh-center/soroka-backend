import { Table, Column, Model } from 'sequelize-typescript'

@Table
class UserRole extends Model {
    @Column
    name: string

    @Column
    key: string
}

export default UserRole
