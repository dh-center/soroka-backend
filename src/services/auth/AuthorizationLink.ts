import { IAuthorizationLinkService } from "../../interfaces"
import AuthorizationLink from "../../models/auth/AuthorizationLink"
import User from "../../models/users/User"

class AuthorizationLinkService implements IAuthorizationLinkService {
    getUser = async (token: string) : Promise<any> => {
        const user = await this.getUserInstance(token)

        if (user) {
            return user.toJSON()
        }

        return null
    }

    getUserInstance = async(token: string) : Promise<any> => {
        const authorizationLink = await AuthorizationLink.findOne({ where: { token } })
        
        if (authorizationLink) {
            const { userId } = authorizationLink
            const user = await User.findOne({ where: { id: userId } })

            return user
        }
    }
}

export default AuthorizationLinkService
