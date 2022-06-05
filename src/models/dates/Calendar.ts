import { Table, Column, Model, AllowNull } from 'sequelize-typescript'

@Table
class Calendar extends Model {
    @AllowNull(false)
    @Column
    name: string
}

export default Calendar
