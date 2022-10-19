import { IAuthorizationLinkController, ICardController, ICardTemplateController, IDataTypeController, IDateCatalogController, IFilledPropertyController, IGeoPropertyController, IOrganizationController, IPropertyController, IUserController, IFileController } from "../interfaces"

type ControllerContainer = {
    userController: IUserController,
    cardController: ICardController,
    cardTemplateController: ICardTemplateController,
    dataTypeController: IDataTypeController,
    propertyController: IPropertyController,
    filledPropertyContoller: IFilledPropertyController,
    authorizationLinkController: IAuthorizationLinkController,
    organizationController: IOrganizationController,
    dateController: IDateCatalogController,
    geoPropertyController: IGeoPropertyController,
    fileController: IFileController
}

export {
    ControllerContainer
}
