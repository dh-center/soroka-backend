import express from "express"
import { IFilledPropertyController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: IFilledPropertyController
) {
    const router: express.Router = express.Router()

    router.route('/:cardId')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAll)
        .post(passport.authenticate('authAndNoAuth', { session: false }), controller.create)
        .delete(passport.authenticate('authAndNoAuth', { session: false }), controller.delete)

    router.route('/by-id/:propertyId')
        .patch(passport.authenticate('authAndNoAuth', { session: false }), controller.update)
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getByPk)
    
    router.route('/bulk/update')
        .patch(passport.authenticate('authAndNoAuth', { session: false }), controller.bulkUpdate)

    router.route('/bulk/delete/:cardId')
        .delete(passport.authenticate('authAndNoAuth', { session: false }), controller.bulkDelete)


    return router
}

export default getRouter
