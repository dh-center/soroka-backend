import { Request, Response } from "express"
import { IPropertyController, IPropertyService } from "../../interfaces"

class PropertyController implements IPropertyController {
    constructor(private propertyService: IPropertyService) {
        this.propertyService = propertyService
    }

    getAll = async (request: Request, response: Response) => {
        let propertiesResponse;

        const authInfo: any = request.authInfo
        
        // edit the response for non-user whitelisted auth
        if (authInfo?.domain) {
            propertiesResponse = await this.propertyService.getAllWhitelisted()
        } else {
            propertiesResponse = await this.propertyService.getAll()
        }

        return response
            .status(propertiesResponse.status)
            .send(propertiesResponse.detail)
    }
}

export default PropertyController
