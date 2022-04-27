import { Table, Column, Model, AllowNull, ForeignKey, BelongsToMany, DataType as DT } from 'sequelize-typescript'
import Card, { FilledPropertyCard } from './Card'
import Property from './Property'

@Table
class FilledProperty extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @ForeignKey(() => Property)
    @Column
    propertyId: number

    @AllowNull(false)
    @Column(DT.JSON)
    data: string

    @BelongsToMany(() => Card, () => FilledPropertyCard)
    cardsList: Card[]
}

export default FilledProperty
