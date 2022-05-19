import AuthorizationLink from "../../models/auth/AuthorizationLink"
import User from "../../models/users/User"


class AuthorizationLinkService {
    private token: string

    constructor(token: string) {
        this.token = token
    }

    getUser = async () : Promise<any> => {
        const user = await this.getUserInstance()

        if (user) {
            return user.toJSON()
        }

        return null
    }

    getUserInstance = async() : Promise<any> => {
        const token = this.token
        const authorizationLink = await AuthorizationLink.findOne({ where: { token } })
        
        if (authorizationLink) {
            const { userId } = authorizationLink
            const user = await User.findOne({ where: { id: userId } })

            return user
        }
    }
}

export default AuthorizationLinkService
