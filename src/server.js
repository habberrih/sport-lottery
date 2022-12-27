const http = require('http');
const app = require('./app');
const dotenv = require('dotenv');
const server = http.createServer(app);

dotenv.config();
const PORT = process.env.PORT || 3500;

async function startServer() {
  server.listen(PORT, () => {
    console.log(`Starting server on port ${PORT} ...`);
  });
}

startServer();
