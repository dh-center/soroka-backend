import express from "express"
import { IDataTypeController } from "../../../interfaces"
import passport from "../../../middlewares/passport"

function getRouter(
    controller: IDataTypeController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAll)

    return router
}

export default getRouter
