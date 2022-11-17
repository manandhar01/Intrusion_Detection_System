const express = require("express");
const bodyParser = require("body-parser");

const app = express();

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

let data = [
    {
        a: {
            x: 3,
            y: 9,
        },
        b: 2,
        c: 3,
    },
    {
        a: {
            x: 0,
            y: 3,
        },
        b: 5,
        c: 6,
    },
    {
        a: {
            x: 4,
            y: 8,
        },
        b: 8,
        c: 9,
    },
    {
        a: {
            x: 0,
            y: 1,
        },
        b: 5,
        c: 6,
    },
    {
        a: {
            x: 3,
            y: 9,
        },
        b: 2,
        c: 3,
    },
    {
        a: {
            x: 0,
            y: 3,
        },
        b: 5,
        c: 6,
    },
    {
        a: {
            x: 4,
            y: 8,
        },
        b: 8,
        c: 9,
    },
    {
        a: {
            x: 0,
            y: 1,
        },
        b: 5,
        c: 6,
    },
    {
        a: {
            x: 3,
            y: 9,
        },
        b: 2,
        c: 3,
    },
    {
        a: {
            x: 0,
            y: 3,
        },
        b: 5,
        c: 6,
    },
    {
        a: {
            x: 4,
            y: 8,
        },
        b: 8,
        c: 9,
    },
    {
        a: {
            x: 0,
            y: 1,
        },
        b: 5,
        c: 6,
    },
    {
        a: {
            x: 3,
            y: 9,
        },
        b: 2,
        c: 3,
    },
    {
        a: {
            x: 0,
            y: 3,
        },
        b: 5,
        c: 6,
    },
    {
        a: {
            x: 4,
            y: 8,
        },
        b: 8,
        c: 9,
    },
    {
        a: {
            x: 0,
            y: 1,
        },
        b: 5,
        c: 6,
    },
];

data = JSON.stringify(data);

app.get("/data", (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
