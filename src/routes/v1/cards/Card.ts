import express from "express"
import { ICardController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: ICardController
) {
    const router: express.Router = express.Router()

    // temporarily no auth routes for the demo
    router.route('/noAuth')
        .get(controller.getAll)

    router.route('/noAuth/by-org/:orgId')
        .get(controller.getAllByOrgId)
    // end of temp no auth routs

    router.route('/')
        .get(passport.authenticate('jwt', { session: false }), controller.getAll)
        .post(passport.authenticate('jwt', { session: false }), controller.create)     
    
    router.route('/by-first-organization/')
        .get(controller.getAllByFirstOrganization)

    router.route('/by-org/:orgId')
        .get(controller.getAllByOrgId)

    router.route('/by-id/:cardId')
        .get(controller.getByPk)
        .patch(controller.update)
        .delete(passport.authenticate('jwt', { session: false }), controller.delete)
    
    return router
}

export default getRouter
