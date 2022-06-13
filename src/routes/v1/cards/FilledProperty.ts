import express from "express"
import { IFilledPropertyController } from "../../../interfaces"

function getRouter(
    controller: IFilledPropertyController
) {
    const router: express.Router = express.Router()

    router.route('/:cardId')
        .get(controller.getAll)
        .post(controller.create)
        .delete(controller.delete)

    router.route('/bulk/update')
        .patch(controller.bulkUpdate)

    router.route('/bulk/delete/:cardId')
        .delete(controller.bulkDelete)

    router.route('/by-id/:propertyId')
        .patch(controller.update)
        .get(controller.getByPk)
    
    return router
}

export default getRouter
