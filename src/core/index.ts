import express from "express"
import cors from "cors"
import { createServer, Server } from "http"
import getRouter from "../routes/v1/index"
import adminRoutes from "../routes/admin/admin"
import docsRoutes from "../routes/docs/Swagger"
import sequelize from "../providers/db"
import { Sequelize } from 'sequelize-typescript'
import bodyParser from "body-parser"
import passport from "../middlewares/passport"

// controllers
import { ControllerContainer } from "../types"
import UserController from "../controllers/users/User"
import UserService from "../services/users/User"
import CardController from "../controllers/cards/Card"
import CardService from "../services/cards/Card"
import CardTemplateController from "../controllers/cards/CardTemplate"
import CardTemplateService from "../services/cards/CardTemplate"
import DataTypeController from "../controllers/cards/DataType"
import DataTypeService from "../services/cards/DataType"
import PropertyController from "../controllers/cards/Property"
import FileController from "../controllers/file/File"
import PropertyService from "../services/cards/Property"
import AuthorizationLinkController from "../controllers/auth/AuthorizationLink"
import FilledPropertyController from "../controllers/cards/FilledProperty"
import GeoPropertyController from "../controllers/cards/GeoProperty"
import DateCatalogController from "../controllers/dates/DateCatalog"
import OrganizationController from "../controllers/organizations/Organization"
import AuthorizationLinkService from "../services/auth/AuthorizationLink"
import FilledPropertyService from "../services/cards/FilledProperty"
import GeoPropertyService from "../services/cards/GeoProperty"
import DateCatalogService from "../services/dates/DateCatalog"
import OrganizationService from "../services/organizations/Organization"
import FileService from "../services/file/File"
import { API_PREFIX } from "../configs/constants"
import autoDeleteOldFiles from '../utils/autoDelete'

class App {
    public port: string
  
    readonly app: express.Application
    readonly server: Server
    readonly sequelize: Sequelize
    readonly apiPrefix: string

    constructor(port = '8000') {
        this.port = process.env.SERVER_PORT || port
    
        this.apiPrefix = API_PREFIX

        this.app = this.createApp()
        this.server = createServer(this.app)
        this.sequelize = sequelize

        setInterval(autoDeleteOldFiles, Number(process.env.AUTOREMOVE_CHECK_INTERVAL_MS))
    }
    
    private createApp = (): express.Application => {
        const app = express()

        app.use(cors())
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use(`${this.apiPrefix}/`, getRouter(this.provideControllers()))
        app.use('/admin', adminRoutes)
        if (process.env.NODE_ENV != 'production') {
            app.use('/swagger', docsRoutes)
        }
        
        return app
    }

    private provideControllers = (): ControllerContainer => {
        // process.env.ENVIRONMENT === 'PROD' ...
        return {
            userController: new UserController(
                new UserService()
            ),
            cardController: new CardController(
                new CardService()
            ),
            cardTemplateController: new CardTemplateController(
                new CardTemplateService()
            ),
            dataTypeController: new DataTypeController(
                new DataTypeService()
            ),
            propertyController: new PropertyController(
                new PropertyService()
            ),
            filledPropertyContoller: new FilledPropertyController(
                new FilledPropertyService()
            ),
            authorizationLinkController: new AuthorizationLinkController(
                new AuthorizationLinkService()
            ),
            organizationController: new OrganizationController(
                new OrganizationService()
            ),
            dateController: new DateCatalogController(
                new DateCatalogService()
            ),
            geoPropertyController: new GeoPropertyController(
                new GeoPropertyService()
            ),
            fileController: new FileController(
                new FileService()
            )
        }
    }

    public start = (): void => {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App
