import { Sequelize } from 'sequelize-typescript'
import AuthorizationLink from '../models/auth/AuthorizationLink'
import RefreshToken from '../models/auth/RefreshToken'
import Card, { FilledPropertyCard } from '../models/cards/Card'
import CardTemplate from '../models/cards/CardTemplate'
import DataType from '../models/cards/DataType'
import FilledProperty from '../models/cards/FilledProperty'
import GeoProperty from '../models/cards/GeoProperty'
import Property from '../models/cards/Property'
import Calendar from '../models/dates/Calendar'
import DateCatalog from '../models/dates/DateCatalog'
import Organization from '../models/organizations/Organization'
import User from '../models/users/User'
import UserRole from '../models/users/UserRole'
import File from "../models/files/File"
import { Dialect } from 'sequelize/types'

const dbConfig = {
    database: process.env.POSTGRES_DB as string || 'soroka',
    username: process.env.POSTGRES_USER as string || 'soroka',
    host: process.env.DB_HOST as string || 'db',
    dialect: process.env.DB_DIALECT as Dialect || 'postgres',
    password: process.env.POSTGRES_PASSWORD as string || 'soroka',
    port: process.env.DB_PORT as unknown as number || 5432
}

const sequelize = new Sequelize({
    ...dbConfig,
    logging: console.log,
})

const models = [
    User, RefreshToken,
    UserRole, Organization,
    AuthorizationLink,
    DataType, Property,
    FilledProperty, Card,
    CardTemplate,
    FilledPropertyCard,
    DateCatalog,
    Calendar,
    GeoProperty,
    File
]

sequelize.addModels(models)

sequelize
    .sync()
    .then(() => {
        console.log('synced models')
    })
    .catch((e) => console.log(e));

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection()

export default sequelize
