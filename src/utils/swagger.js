// eslint-disable-next-line
import swaggerAutogen from 'swagger-autogen'

const outputFile = '../core/swagger_output.json'
const endpointsFiles = ['../routes/v1/index.ts']

swaggerAutogen(outputFile, endpointsFiles)
