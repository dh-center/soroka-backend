import express from "express"
import { IOrganizationController } from "../../../interfaces"

function getRouter(
    controller: IOrganizationController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(controller.getAll)

    router.route('/owners/:organizationId')
        .get(controller.getOwnersByOrganizationId)
    
    return router
}

export default getRouter
