import { Sequelize } from 'sequelize-typescript'
import RefreshToken from '../models/auth/RefreshToken'
import Organization from '../models/organizations/Organization'
import User from '../models/users/User'
import UserRole from '../models/users/UserRole'

const sequelize = new Sequelize({
  database: 'soroka',
  dialect: 'postgres',
  port: 6432,
  username: 'soroka',
  password: 'soroka',
  logging: console.log,
})

const models = [User, RefreshToken, UserRole, Organization]

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
