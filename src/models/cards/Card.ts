import { Table, Column, Model, AllowNull, ForeignKey, BelongsToMany } from 'sequelize-typescript'
import Organization from '../organizations/Organization'
import User from '../users/User'
import FilledProperty from './FilledProperty'

@Table
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

    @BelongsToMany(() => FilledProperty, () => FilledPropertyCard)
    propertiesList: FilledProperty[]

    @AllowNull(false)
    @Column
    preventDelete: boolean
}

@Table
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
