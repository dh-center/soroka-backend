import { Request, Response } from "express"
import { IOrganizationController, IOrganizationService } from "../../interfaces"

class OrganizationController implements IOrganizationController {
    constructor (private organizationService: IOrganizationService) {
        this.organizationService = organizationService
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
