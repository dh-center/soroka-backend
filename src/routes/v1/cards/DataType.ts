import express from "express"
import { IDataTypeController } from "../../../interfaces"

function getRouter(
    controller: IDataTypeController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(controller.getAll)

    return router
}

export default getRouter
