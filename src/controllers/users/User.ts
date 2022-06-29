import User from '../../models/users/User'
import UserError from '../../errors/users/User'
import jwt from 'jsonwebtoken'
import { jwtOptions } from '../../middlewares/passport'
import RefreshTokenService from '../../services/auth/RefreshToken'
import { Request, Response } from "express"
import { IUserController, IUserService } from '../../interfaces'

class UserController implements IUserController {
    constructor(private userService: IUserService) {
        this.userService = userService
    }

    get = async (request: Request, response: Response) => {
        try {
            const user: User | UserError = await this.userService.getById(
                Number(request.params.id)
            )

            response.send(user)
        } catch (error: any) {
            response.status(404).send({ "error": error.message })
        }
    }

    post = async (request: Request, response: Response) => {
        const { body } = request

        try {
            const user : User|UserError = await this.userService.create(body)

            response.status(201).send(user)
        } catch (error: any) {
            response.status(400).send({ "error": error.message })
        }
    }

    acceptTerms = async (request: Request, response: Response) => {
        const { hasAcceptTermsOfUse, userId } = request.body

        const user: any = await this.userService.update(userId, { hasAcceptTermsOfUse })

        return response.status(200).send(user)
    }

    me = async (request: Request, response: Response) => {
        response.send(request.user)
    }

    private signJwt = async (user: User): Promise<
        { accessToken: string, refreshToken: string } | null
    > => {
        const payload = { id: user.id }

        const accessToken = jwt.sign(payload, jwtOptions.secretOrKey)

        const refreshTokenService = new RefreshTokenService(user)

        const refreshToken = await refreshTokenService.generateRefreshToken()

        return { accessToken, refreshToken }
    } 

    auth = async (request: Request, response: Response) => {
        const { body } = request

        const { email, password } = body

        try {
            const { user, checkPassword } = await this.userService.checkPassword(email, password)

            if (checkPassword) {
                const tokens = await this.signJwt(user)

                if (tokens) {
                    const { accessToken, refreshToken } = tokens

                    return response.send({ accessToken, refreshToken })
                }
            }

            return response.status(401).send({ error: 'Login or password is incorrect!' })
        } catch (e: any) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }

    refreshToken = async (request: Request, response: Response) => {
        const { body } = request

        const { refreshToken } = body

        const refreshTokenService = new RefreshTokenService()

        try {
            const { userId, isExpired } = await refreshTokenService
                .isRefreshTokenExpired(refreshToken)

            if (!isExpired && userId) {
                const user = await this.userService.getById(userId)

                const tokens = await this.signJwt(user)

                if (tokens) {
                    const { accessToken, refreshToken } = tokens

                    return response.send({ accessToken, refreshToken })
                }
            }

            return response.status(401).send({ error: 'Invalid credentials' })
        } catch (e) {
            return response.status(500).send({ error: 'Internal server error' })
        }
    }
}

export default UserController
