import {
  Table,
  Column,
  Model,
  AllowNull,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript'

import FilledProperty from '../cards/FilledProperty'
import User from '../users/User'

@Table
class File extends Model {
  @AllowNull(false)
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

  @Column
  @ForeignKey(() => FilledProperty)
  field_id: number

  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  owner_id: number
}

export default File
