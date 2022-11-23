import express from "express"
import { IOrganizationController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: IOrganizationController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAll)

    router.route('/owners/:organizationId')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getOwnersByOrganizationId)
    
    return router
}

export default getRouter
