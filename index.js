const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const apiRouter = require("./routes");
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", apiRouter);

server.listen(3001, () => {
    console.log("Listening at 3001");
});
