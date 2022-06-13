import AuthorizationLinkService from "../../services/auth/AuthorizationLink"
import User from "../../models/users/User"
import { Request, Response } from "express"

class AuthorizationLinkController {
    private authorizationLinkService: AuthorizationLinkService

    get = async (request: Request, response: Response) => {
        this.authorizationLinkService = new AuthorizationLinkService(
            request.params.uuid
        )

        const user: User | null = await this.authorizationLinkService.getUser()

        if (user) {
            return response.send(user)
        }

        return response.status(404).send({ message: "User is not found" })
    }

    setPassword = async (request: Request, response: Response) => {
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
