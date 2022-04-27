import express from "express"
import CardTemplateController from "../../../controllers/cards/CardTemplate"

const router: express.Router = express.Router()

const controller: CardTemplateController = new CardTemplateController()

router.route('/')
    .get(controller.getAll)

router.route('/:id')
    .get(controller.getByPk)

export default router
