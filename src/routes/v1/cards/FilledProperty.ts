import express from "express"
import FilledPropertyController from "../../../controllers/cards/FilledProperty"

const router: express.Router = express.Router()

const controller: FilledPropertyController = new FilledPropertyController()

router.route('/:cardId')
    .get(controller.getAll)
    .post(controller.create)
    .delete(controller.delete)

router.route('/by-id/:propertyId')
    .patch(controller.update)
    .get(controller.getByPk)

export default router