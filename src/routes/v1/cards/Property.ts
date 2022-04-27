import express from "express"
import PropertyController from "../../../controllers/cards/Property"

const router: express.Router = express.Router()

const controller: PropertyController = new PropertyController()

router.route('/')
    .get(controller.getAll)

export default router
