const app = require("./src/app");
const ConnectDB = require("./src/config/db");
const http = require("http");
require("dotenv").config();
const { syncStepsToBlockchain } = require("./src/services/blockchainService");

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

ConnectDB()
  .then(() =>
    server.listen(PORT, () => {
      console.log(
        "DATABASE connected in server!\nServer is listening on port 4000"
      );
      setInterval(syncStepsToBlockchain, 10 * 60 * 1000);
    })
  )
  .catch((e) => console.log("Error connecting to database", e));
