import express from "express"
import { ICardController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: ICardController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAll)
        .post(passport.authenticate('authAndNoAuth', { session: false }), controller.create)     
    
    router.route('/by-org/:orgId')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAllByOrgId)

    router.route('/by-id/:cardId')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getByPk)
        .patch(passport.authenticate('authAndNoAuth', { session: false }), controller.update)
        .delete(passport.authenticate('authAndNoAuth', { session: false }), controller.delete)
    
    return router
}

export default getRouter
