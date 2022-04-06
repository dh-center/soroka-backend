import AuthorizationLinkService from "../../services/auth/AuthorizationLink"
import User from "../users/User"

class AuthorizationLinkController {
    private authorizationLinkService: AuthorizationLinkService

    get = async (request: any, response: any) => {
        this.authorizationLinkService = new AuthorizationLinkService(
            request.params.uuid
        )

        const user: User | null = await this.authorizationLinkService.getUser()

        if (user) {
            return response.send(user)
        }

        return response.status(404).send({ message: "User is not found" })
    }
}

export default AuthorizationLinkController
