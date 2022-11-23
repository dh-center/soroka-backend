import { Table, Column, Model, AllowNull } from 'sequelize-typescript'

@Table
class Domain extends Model {
    @AllowNull(false)
    @Column
    domain: string

    @AllowNull(false)
    @Column
    token: string
}

export default Domain
