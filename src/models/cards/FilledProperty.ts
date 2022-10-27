import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey,
    BelongsToMany,
    DataType as DT,
    HasMany,
    DefaultScope,
    Length,
    BelongsTo,
    Scopes
} from 'sequelize-typescript'
import Card, { FilledPropertyCard } from './Card'
import Property from './Property'
import GeoProperty from './GeoProperty'

@DefaultScope(() => ({
    include: [Property.scope('dataType'), {model: GeoProperty, attributes: ['name', 'location']}],
    attributes: { exclude: ['FilledPropertyCard', 'createdAt', 'updatedAt']}
}))
@Scopes(() => ({
    short: {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [Property.scope('dataType'), {model: GeoProperty, attributes: ['name', 'location']}],
    }
}))
@Table
class FilledProperty extends Model {
    @AllowNull(false)
    @ForeignKey(() => Property)
    @Column
    propertyId: number

    @Length({ max: 100000 })
    @Column(DT.STRING(100000))
    data: string

    @BelongsToMany(() => Card, () => FilledPropertyCard)
    cardsList: Card[]

    @HasMany(() => GeoProperty)
    geoProperty: GeoProperty

    @BelongsTo(() => Property)
    property: Property
}

export default FilledProperty
