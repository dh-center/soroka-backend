import DateCatalogController from '../../../controllers/dates/DateCatalog'
import express from "express"

const router: express.Router = express.Router()

const controller: DateCatalogController = new DateCatalogController()

router.route('/')
    .get(controller.list)

export default router
