const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");

const apiRouter = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/");
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        },
    }),
}).single("file");

apiRouter.post("/formpost", (req, res) => {
    console.log(Object.values(req.body));
    const process = spawn("python", ["test.py"]);
    process.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    // res.json(req.body);
});

apiRouter.post("/upload_file", upload, (req, res) => {
    res.send({ a: 5 });
});

// apiRouter.post("/test_row", (req, res) => {
//     console.log(req.body);
//     res.send(JSON.stringify('abc'))
// });

module.exports = apiRouter;
