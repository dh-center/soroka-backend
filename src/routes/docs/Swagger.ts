import express from "express"
import swaggerUi from 'swagger-ui-express'

const router: express.Router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require('../../core/swagger.json')

router.use('', swaggerUi.serve)
router.get('', swaggerUi.setup(swaggerDocument))

export default router
