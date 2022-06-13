import User from "../../models/users/User"
import { Request, Response } from "express"
import { IAuthorizationLinkController, IAuthorizationLinkService } from "../../interfaces"

class AuthorizationLinkController implements IAuthorizationLinkController {
    constructor(private authorizationLinkService: IAuthorizationLinkService) {
        this.authorizationLinkService = authorizationLinkService
    }

    get = async (request: Request, response: Response) => {
        const user: User | null = await this.authorizationLinkService
            .getUser(request.params.uuid)

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

        const user: User | null = await this.authorizationLinkService
            .getUserInstance(request.params.uuid)

        if (user) {
            user.password = password
            await user.save()
        }

        return response.status(204).send()
    }
}

export default AuthorizationLinkController
