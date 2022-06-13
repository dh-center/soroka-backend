import express from "express"
import { IGeoPropertyController } from "../../../interfaces"

function getRouter(
    controller: IGeoPropertyController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(controller.getAll)
        .post(controller.create)

    router.route('/by-id/:propertyId')
        .get(controller.getByPk)
        .patch(controller.update)
    
    return router
}

export default getRouter
