const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const { sendTraffic } = require("./controllers/trafficController");
const apiRouter = require("./routes");
const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const io = new Server(server, {
    cors: {
        //accept request from localhost:3000 and allowed methods will be GET,POST
        origin: "*",
        methods: ["GET", "POST"],
    },
});
io.on("connection", sendTraffic);

app.use("/", apiRouter);

server.listen(3001, () => {
    console.log("Listening at 3001");
});
