import { randomUUID } from 'crypto'
import {
    Table,
    Column,
    Model,
    Unique,
    AllowNull,
    AfterCreate,
    BeforeCreate,
    BeforeUpdate,
    ForeignKey,
    DefaultScope,
    Scopes
} from 'sequelize-typescript'
import hashPassword from '../../utils/hashPassword'
import AuthorizationLink from '../auth/AuthorizationLink'
import Organization from '../organizations/Organization'
import UserRole from './UserRole'

@DefaultScope(() => ({
    attributes: ['id', 'name', 'email', 'hasAcceptTermsOfUse', 'userRole', 'organization']
}))
@Scopes(() => ({
    auth: {
        attributes: ['id', 'email', 'password']
    } 
}))
@Table
class User extends Model {
    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Unique
    @Column
    email: string

    @AllowNull(false)
    @Column
    password: string

    @AllowNull(false)
    @Column
    timezone: string

    @AllowNull(false)
    @Column
    hasAcceptTermsOfUse: boolean

    @AllowNull(false)
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

    @AfterCreate
    static async generateAuthorizationLink(instance: User) {
        const token = randomUUID()

        const userId = instance.id

        await AuthorizationLink.create({ token, userId })
    }
}

export default User
