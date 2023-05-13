import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
// import { version } from './package.json'


const options = swaggerJSDoc.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "book API",
            version: "1.0.0"
        },
        components: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    apis: ['./*/api/views.js', './*/models.js']
}

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
    })
}

export default swaggerDocs;