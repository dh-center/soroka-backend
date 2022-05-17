import express from "express"
import userRoutes from "./users/User"
import authorizationLinkRoutes from "./auth/AuthorizationLink"
import dataTypeRoutes from "./cards/DataType"
import propertyRoutes from "./cards/Property"
import filledPropertiesRoutes from "./cards/FilledProperty"
import cardRoutes from "./cards/Card"
import cardTemplateRoutes from "./cards/CardTemplate"
import organizationRoutes from "./organizations/Organization"

const router: express.Router = express.Router()

router.use('/users', userRoutes)
router.use('/cards', cardRoutes)
router.use('/cards/templates', cardTemplateRoutes)
router.use('/cards/data-types', dataTypeRoutes)
router.use('/cards/properties', propertyRoutes)
router.use('/cards/filled-properties', filledPropertiesRoutes)
router.use('/authorization-link', authorizationLinkRoutes)
router.use('/organizations', organizationRoutes)

export default router
