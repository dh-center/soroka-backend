import express from "express"
import AuthorizationLinkController from "../../../controllers/auth/AuthorizationLink"

const router: express.Router = express.Router()

const controller: AuthorizationLinkController = new AuthorizationLinkController()

router.route('/:uuid')
    .get(controller.get)
    .post(controller.setPassword)

export default router
