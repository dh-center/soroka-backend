import express from "express"
import OrganizationController from "../../../controllers/organizations/Organization"

const router: express.Router = express.Router()

const controller: OrganizationController = new OrganizationController()

router.route('/')
    .get(controller.getAll)

router.route('/owners/:organizationId')
    .get(controller.getOwnersByOrganizationId)

export default router
