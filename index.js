const express = require("express");
const bodyParser = require("body-parser");
// const fs = require("fs");
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

app.get("/data", (req, res) => {
    csvtojson()
        .fromFile("./test.csv")
        .then((data) => {
            let columns = [];
            cols = Object.keys(data[0]);
            cols.forEach((col) => {
                columns.push({ accessorKey: col, header: col });
            });
            res.json(JSON.stringify({ data, columns }));
        });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
