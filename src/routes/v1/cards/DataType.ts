import express from "express"
import DataTypeController from "../../../controllers/cards/DataType"

const router: express.Router = express.Router()

const controller: DataTypeController = new DataTypeController()

router.route('/')
    .get(controller.getAll)

export default router
