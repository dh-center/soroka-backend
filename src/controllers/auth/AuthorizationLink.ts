import AuthorizationLinkService from "../../services/auth/AuthorizationLink"
import User from "../../models/users/User"

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

    setPassword = async (request: any, response: any) => {
        const { password, rePassword } = request.body

        if (password !== rePassword) {
            return response.status(400).send({ message: "Passwords do not match" })
        }

        this.authorizationLinkService = new AuthorizationLinkService(
            request.params.uuid
        )

        const user: User | null = await this.authorizationLinkService.getUserInstance()

        if (user) {
            user.password = password
            await user.save()
        }

        return response.status(204).send()
    }
}

export default AuthorizationLinkController
