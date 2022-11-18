const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const csvtojson = require("csvtojson");

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(bodyParser.json());

const port = 5000;

let fileChanged = true;

fs.watchFile("test.csv", () => {
    fileChanged = true;
});

app.get("/data", (req, res) => {
    if (fileChanged) {
        csvtojson()
            .fromFile("./test.csv")
            .then((data) => {
                let columns = [];
                cols = Object.keys(data[0]);
                cols.forEach((col) => {
                    columns.push({ accessorKey: col, header: col });
                });
                fileChanged = false;
                res.json(JSON.stringify({ data, columns, fileChanged: true }));
            });
    } else {
        res.json(JSON.stringify({ fileChanged: false }));
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
