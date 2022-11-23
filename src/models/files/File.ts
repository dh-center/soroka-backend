import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey,
  PrimaryKey
} from 'sequelize-typescript'

import FilledProperty from '../cards/FilledProperty'
import User from '../users/User'

@Table({
  paranoid: true
})
class File extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column
  id: string

  @AllowNull(true)
  @Column
  path: string

  @AllowNull(false)
  @Column
  isPublic: boolean

  @AllowNull(true)
  @Column
  hash: string

  @AllowNull(false)
  @Column
  size: number
  
  @AllowNull(false)
  @Column
  name: string

  @AllowNull(true)
  @Column
  dimensions: string

  @ForeignKey(() => FilledProperty)
  @Column
  field_id: number

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  owner_id: number
}

export default File
