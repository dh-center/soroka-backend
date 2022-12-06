import express from "express"
import { IPropertyController } from "../../../interfaces"
import passport from '../../../middlewares/passport'

function getRouter(controller: IPropertyController) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(passport.authenticate('authAndNoAuth', { session: false }), controller.getAll)
    
    return router
}
export default getRouter
