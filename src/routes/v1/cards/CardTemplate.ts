import express from "express"
import { ICardTemplateController } from "../../../interfaces"

function getRouter(
    controller: ICardTemplateController
) {
    const router: express.Router = express.Router()

    router.route('/')
        .get(controller.getAll)

    router.route('/:id')
        .get(controller.getByPk)

    return router
}

export default getRouter
