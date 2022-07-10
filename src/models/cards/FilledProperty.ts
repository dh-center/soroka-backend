import {
    Table,
    Column,
    Model,
    AllowNull,
    ForeignKey,
    BelongsToMany,
    DataType as DT,
    BeforeUpdate,
    HasMany,
    DefaultScope,
    Length,
    BelongsTo,
    AfterCreate,
    Scopes
} from 'sequelize-typescript'
import Card, { FilledPropertyCard } from './Card'
import DataType from './DataType'
import Property from './Property'
import GeoProperty from './GeoProperty'
import { fillRelatedData } from '../../utils/filledProperties'

@DefaultScope(() => ({
    include: [Property.scope('dataType')],
    attributes: { exclude: ['FilledPropertyCard', 'createdAt', 'updatedAt'] }
}))
@Scopes(() => ({
    short: {
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
}))
@Table
class FilledProperty extends Model {
    @AllowNull(false)
    @ForeignKey(() => Property)
    @Column
    propertyId: number

    @Length({ max: 100000 })
    @Column(DT.JSON)
    data: string

    @BelongsToMany(() => Card, () => FilledPropertyCard)
    cardsList: Card[]

    @HasMany(() => GeoProperty)
    geoProperty: GeoProperty

    @BelongsTo(() => Property)
    property: Property

    @BeforeUpdate
    static async onFilledPropertyChanged(instance: FilledProperty) {
        const dataType = instance.property.dataType.name

        fillRelatedData(instance, dataType)
    }

    @AfterCreate
    static async onFilledPropertyCreated(instance: FilledProperty) {
        // после создания мы ещё не имеем связи
        const property = await Property.findByPk(instance.propertyId)
        const dataType = await DataType.findByPk(property?.dataTypeId)

        if (dataType?.name) {
            fillRelatedData(instance, dataType.name)
        }
    }
}

export default FilledProperty
