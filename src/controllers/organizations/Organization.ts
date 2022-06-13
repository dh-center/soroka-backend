import OrganizationService from "../../services/organizations/Organization"
import { Request, Response } from "express"

class OrganizationController {
    private organizationService: OrganizationService

    constructor () {
        this.organizationService = new OrganizationService()
    }

    getAll = async (request: Request, response: Response) => {
        const organizationsResponse = await this.organizationService.getAll()

        return response
            .status(organizationsResponse.status)
            .send(organizationsResponse.detail)
    }

    getOwnersByOrganizationId = async (request: Request, response: Response) => {
        const organizationId = Number(request.params.organizationId)

        const ownersResponse = await this.organizationService
            .getOwnersByOrganizationId(organizationId)
        
        return response.status(ownersResponse.status).send(ownersResponse.detail)
    }
}

export default OrganizationController
