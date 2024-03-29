import User from '../../models/users/User'
import UserError from '../../errors/users/User'
import checkPassword from '../../utils/checkPassword'
import { IUserService } from '../../interfaces'

class UserService implements IUserService {
    async getById(id: number) : Promise<User> {
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')
    }

    async create(userData: any) : Promise<User|UserError> {
        try {
            const user = await User.create(userData)

            return user.toJSON()
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }

    async update(id: number, userData: any) : Promise<any> {
        try {
            const user: any = await User.findByPk(id)

            for (const key in userData) {
                user[key] = userData[key]
            }

            await user.save()

            return user
        } catch (e) {
            return e
        }
    }

    async checkPassword(email: string, password: string) : Promise<any> {
        const user = await User.scope('auth').findOne({ where: { email } })

        if (user) return { user: user.toJSON(), checkPassword: checkPassword(user, password) }

        throw new UserError('Incorrect login/password!')
    }
}

export default UserService
