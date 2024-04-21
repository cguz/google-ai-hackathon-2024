const express = require('express');
const cors = require('cors');

// [Swagger] Library for generating API documentation
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Create an instance of express app
const app = express();

// Configure express app
app.use(cors()); // Integrate CORS middleware
app.use(express.json()); // Parse requests in JSON format

// Route
app.use('/api', require('./routes/api'));

// [Swagger] API documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;