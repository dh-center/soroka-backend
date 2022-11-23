import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey,
    BelongsToMany,
    Scopes,
    DeletedAt
} from 'sequelize-typescript'
import Organization from '../organizations/Organization'
import User from '../users/User'
import FilledProperty from './FilledProperty'

@Scopes(() => ({
    detail: {
        include: [FilledProperty.scope('short')]
    }
}))
@Table({
    paranoid: true
})
class Card extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @ForeignKey(() => User)
    @Column
    userId: number

    @AllowNull(false)
    @ForeignKey(() => Organization)
    @Column
    organizationId: number

    @AllowNull(true)
    @Column
    cover: string

    @BelongsToMany(() => FilledProperty, { as: "properties", through: () => FilledPropertyCard })
    propertiesList: FilledProperty[]

    @AllowNull(false)
    @Column
    preventDelete: boolean
}

@Table({
    paranoid: true
})
class FilledPropertyCard extends Model {
    @ForeignKey(() => FilledProperty)
    @Column
    filledPropertyId: number

    @ForeignKey(() => Card)
    @Column
    cardId: number
}

export { FilledPropertyCard }

export default Card
