import { Sequelize } from 'sequelize-typescript'
import AuthorizationLink from '../models/auth/AuthorizationLink'
import RefreshToken from '../models/auth/RefreshToken'
import Card, { FilledPropertyCard } from '../models/cards/Card'
import CardTemplate from '../models/cards/CardTemplate'
import DataType from '../models/cards/DataType'
import FilledProperty from '../models/cards/FilledProperty'
import Property from '../models/cards/Property'
import Calendar from '../models/dates/Calendar'
import DateCatalog from '../models/dates/DateCatalog'
import Organization from '../models/organizations/Organization'
import User from '../models/users/User'
import UserRole from '../models/users/UserRole'

const sequelize = new Sequelize({
  database: 'soroka',
  dialect: 'postgres',
  port: 5432,
  host: 'db',
  username: 'soroka',
  password: 'soroka',
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
    Calendar
]

sequelize.addModels(models)

sequelize
  .sync()
  .then(() => {
     //something here
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
