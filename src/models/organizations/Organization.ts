import { Table, Column, Model } from 'sequelize-typescript'

@Table
class Organization extends Model {
    @Column
    name: string

    @Column
    address: string
}

export default Organization
