import express from "express"
import userRoutes from "./users/User"
import authorizationLinkRoutes from "./auth/AuthorizationLink"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/authorization-link', authorizationLinkRoutes)

export default router
