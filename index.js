const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const server = http.createServer(app);
const fs = require("fs");
const csvtojson = require("csvtojson");
const bodyParser = require("body-parser");
const apiRouter = require("./routes");

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

const filename = "./test.csv";
io.on("connection", (socket) => {
    fs.watchFile(filename, () => {
        csvtojson()
            .fromFile(filename)
            .then((data) => {
                // let columns = [];
                let d = [];
                data.forEach((datum) => {
                    d.push(Object.values(datum));
                });
                cols = Object.keys(data[0]);
                // cols.forEach((col) => {
                //     columns.push({ accessorKey: col, header: col });
                // });
                // socket.emit("sent from the server", data, columns);
                socket.emit("sent from the server", d, cols);
            });
    });
    console.log(`User connected: ${socket.id}`);
});

app.use("/", apiRouter);

server.listen(3001, () => {
    console.log("Listening at 3001");
});
