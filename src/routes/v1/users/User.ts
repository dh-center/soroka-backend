import express from "express"
import { IUserController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: IUserController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .post(controller.post)

    router.route('/accept-terms')
        .post(controller.acceptTerms)

    router.route('/profile')
        .get(passport.authenticate('jwt', { session: false }), controller.me)

    router.route('/profile/:id')
        .get(controller.get)

    router.route('/login')
        .post(controller.auth)

    router.route('/refresh')
        .post(controller.refreshToken)
    
    return router
}

export default getRouter
