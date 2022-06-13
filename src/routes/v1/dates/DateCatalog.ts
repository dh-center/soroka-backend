import express from "express"
import { IDateCatalogController } from '../../../interfaces'

function getRouter(
    controller: IDateCatalogController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(controller.list)
    
    return router
}

export default getRouter
