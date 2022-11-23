import express from "express"
import { ICardTemplateController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: ICardTemplateController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAll)

    router.route('/:id')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getByPk)

    return router
}

export default getRouter
