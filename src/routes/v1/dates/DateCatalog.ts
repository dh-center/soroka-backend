import express from "express"
import { IDateCatalogController } from '../../../interfaces'
import passport from "../../../middlewares/passport"

function getRouter(
    controller: IDateCatalogController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.list)
    
    return router
}

export default getRouter
