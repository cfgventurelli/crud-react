const PORT = 3003;
const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./routes");
const allowCors = require("./config/cors")

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);
server.use("/api", routes);

server.listen(PORT, () => {
    console.log("Serviço OK");
})