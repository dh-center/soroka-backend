import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    BeforeCreate,
    BeforeUpdate,
    ForeignKey
} from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'
import Organization from '../organizations/Organization'
import UserRole from './UserRole'

@Table
class User extends Model {
    @Column
    name: string

    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @Column
    timezone: string

    @Column
    hasAcceptTermsOfUse: boolean

    @ForeignKey(() => UserRole)
    @Column
    userRole: number

    @ForeignKey(() => Organization)
    @Column
    organization: number

    @BeforeCreate
    @BeforeUpdate
    static generatePasswordHash(instance: User) {
        const { password } = instance

        if (instance.changed('password')) {
            instance.password = hashPassword(password)
        }
    }
}

export default User
