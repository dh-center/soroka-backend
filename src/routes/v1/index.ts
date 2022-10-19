import express from "express"
import userRoutes from "./users/User"
import authorizationLinkRoutes from "./auth/AuthorizationLink"
import dataTypeRoutes from "./cards/DataType"
import propertyRoutes from "./cards/Property"
import filledPropertiesRoutes from "./cards/FilledProperty"
import cardRoutes from "./cards/Card"
import cardTemplateRoutes from "./cards/CardTemplate"
import organizationRoutes from "./organizations/Organization"
import dateRoutes from "./dates/DateCatalog"
import geoPropertyRoutes from "./cards/GeoProperty"
import adminRoutes from "./cards/CsvImport"
import fileRoutes from "./files/File"

import { ControllerContainer } from "../../types"

function getRouter(container: ControllerContainer) {
    const router: express.Router = express.Router()

    router.use('/admin', adminRoutes)
    router.use('/users', userRoutes(container.userController))
    router.use('/cards', cardRoutes(container.cardController))
    router.use('/cards/templates', cardTemplateRoutes(container.cardTemplateController))
    router.use('/cards/data-types', dataTypeRoutes(container.dataTypeController))
    router.use('/cards/properties', propertyRoutes(container.propertyController))
    router.use('/cards/filled-properties', filledPropertiesRoutes(container.filledPropertyContoller))
    router.use('/authorization-link', authorizationLinkRoutes(container.authorizationLinkController))
    router.use('/organizations', organizationRoutes(container.organizationController))
    router.use('/dates', dateRoutes(container.dateController))
    router.use('/geo-properties', geoPropertyRoutes(container.geoPropertyController))
    router.use('/files', fileRoutes(container.fileController))

    return router
}

export default getRouter
