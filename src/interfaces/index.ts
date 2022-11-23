interface IFileController {
    upload: any
    get: any
}

interface IFileService {
    upload: any
    get: any
}

interface IUserController {
    get: any
    post: any
    acceptTerms: any
    me: any
    auth: any
    refreshToken: any
}

interface IUserService {
    getById: any
    create: any
    update: any
    checkPassword: any
}

interface ICardController {
    getByPk: any
    create: any
    update: any
    getAll: any
    getAllByFirstOrganization: any
    getAllByOrgId: any
    delete: any
}

interface ICardService {
    getByPk: any
    create: any
    update: any
    getAll: any
    getAllShort: any
    getAllById: any
    getAllByIdShort: any
    delete: any
}

interface ICardTemplateController {
    getAll: any
    getByPk: any
}

interface ICardTemplateService {
    getAll: any
    getByPk: any
}

interface IDataTypeController {
    getAll: any
}

interface IDataTypeService {
    getAll: any
}

interface IPropertyController {
    getAll: any
}

interface IPropertyService {
    getAll: any
    getAllWhitelisted: any
}

interface IFilledPropertyController {
    getByPk: any
    create: any
    update: any
    getAll: any
    delete: any
    bulkUpdate: any
    bulkDelete: any
}

interface IFilledPropertyService {
    getByPk: any
    create: any
    update: any
    getAll: any
    delete: any
    bulkUpdate: any
    bulkDelete: any
}

interface IAuthorizationLinkController {
    get: any
    setPassword: any
}

interface IAuthorizationLinkService {
    getUser: any
    getUserInstance: any
}

interface IOrganizationController {
    getAll: any
    getOwnersByOrganizationId: any
}

interface IOrganizationService {
    getAll: any
    getAllWhitelisted: any
    getOwnersByOrganizationId: any
}

interface IDateCatalogController {
    list: any
}

interface IDateCatalogService {
    list: any
}

interface IGeoPropertyController {
    getByPk: any
    create: any
    update: any
    getAll: any
}

interface IGeoPropertyService {
    getByPk: any
    create: any
    update: any
    getAll: any
}

export {
    IUserController,
    IUserService,
    ICardController,
    ICardService,
    ICardTemplateController,
    ICardTemplateService,
    IDataTypeController,
    IDataTypeService,
    IPropertyController,
    IPropertyService,
    IFilledPropertyController,
    IFilledPropertyService,
    IAuthorizationLinkController,
    IAuthorizationLinkService,
    IOrganizationController,
    IOrganizationService,
    IDateCatalogController,
    IDateCatalogService,
    IGeoPropertyController,
    IGeoPropertyService,
    IFileController,
    IFileService
}
