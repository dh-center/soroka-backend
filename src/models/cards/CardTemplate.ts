import { Table, Column, Model, AllowNull, ForeignKey, DataType as DT } from 'sequelize-typescript'

@Table
class CardTemplate extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column(DT.JSON)
    propertiesList: string
}

export default CardTemplate
