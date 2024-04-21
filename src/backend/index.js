// Load http protocol
const http = require('http');

// Load express application
const app = require('./src/app');

// Load environment variables
require('dotenv').config();

// Database configuration
require('./src/config/db-mysql');

// Create server
const server = http.createServer(app);

// Define port
const PORT = process.env.PORT || 3000;

// Start server
server.listen(PORT);

// Server event handlers
server.on('listening', () => console.log(`Server running on port: ${PORT}`));
server.on('error', (error) => console.log(error));