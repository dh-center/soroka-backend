import express from "express"
import { ICardController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: ICardController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('jwt', { session: false }), controller.getAll)
        .post(passport.authenticate('jwt', { session: false }), controller.create)
    
    router.route('/by-first-organization')
        .get(controller.getAllByFirstOrganization)

    router.route('/by-id/:cardId')
        .get(controller.getByPk)
        .patch(controller.update)
    
    return router
}

export default getRouter
