import { Table, Column, Model, AllowNull, Scopes, DefaultScope } from 'sequelize-typescript'

@DefaultScope(() => ({
    
}))
@Scopes(() => ({
    short: {
        attributes: { exclude: ['createdAt', 'updatedAt', 'id'] }
    }
}))

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
