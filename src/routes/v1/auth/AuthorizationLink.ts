import express from "express"
import { IAuthorizationLinkController } from "../../../interfaces"

function getRouter(
    controller: IAuthorizationLinkController
) {

    const router: express.Router = express.Router()

    router.route('/:uuid')
        .get(controller.get)
        .post(controller.setPassword)
    
    return router
}

export default getRouter
