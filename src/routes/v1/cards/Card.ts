import express from "express"
import CardController from "../../../controllers/cards/Card"
import passport from "../../../middlewares/passport"

const router: express.Router = express.Router()

const controller: CardController = new CardController()

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), controller.getAll)
    .post(controller.create)

router.route('/by-id/:cardId')
    .get(controller.getByPk)
    .patch(controller.update)

export default router
