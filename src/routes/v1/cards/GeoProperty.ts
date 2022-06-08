import express from "express"
import GeoPropertyController from "../../../controllers/cards/GeoProperty"

const router: express.Router = express.Router()

const controller: GeoPropertyController = new GeoPropertyController()

router.route('/')
    .get(controller.getAll)
    .post(controller.create)

router.route('/by-id/:propertyId')
    .get(controller.getByPk)
    .patch(controller.update)

export default router
