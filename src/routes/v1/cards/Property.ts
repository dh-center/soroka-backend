import express from "express"
import { IPropertyController } from "../../../interfaces"

function getRouter(controller: IPropertyController) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(controller.getAll)
    
    return router
}
export default getRouter
