import express from "express"
import { IGeoPropertyController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: IGeoPropertyController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAll)
        .post(passport.authenticate('authAndNoAuth', { session: false }), controller.create)

    router.route('/by-id/:propertyId')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getByPk)
        .patch(passport.authenticate('authAndNoAuth', { session: false }), controller.update)
    
    return router
}

export default getRouter
