import express from "express"
import cors from "cors"
import { createServer, Server } from "http"
import routes from "../routes/v1/index"
import adminRoutes from "../routes/admin/admin"
import docsRoutes from "../routes/docs/Swagger"
import sequelize from "../providers/db"
import { Sequelize } from 'sequelize-typescript'
import bodyParser from "body-parser"
import passport from "../middlewares/passport"


class App {
    public port: string
  
    private app: express.Application
    private server: Server
    private sequelize: Sequelize

    constructor(port = '8000') {
        this.port = process.env.SERVER_PORT || port
    
        this.app = this.createApp()
        this.server = createServer(this.app)
        this.sequelize = sequelize
    }
    
    private createApp(): express.Application {
        const app = express()
        app.use(cors())
        app.use(bodyParser.json())
        app.use(passport.initialize())
        app.use('/v1', routes)
        app.use('/admin', adminRoutes)
        app.use('/swagger', docsRoutes)
    
        return app
    }

    public start(): void {
        this.server.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }
}

export default App
