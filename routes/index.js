const express = require("express");
const multer = require("multer");
const { spawn } = require("child_process");
const fs = require("fs");

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
    const line_no = req.body.line_no;
    const filename = req.file.originalname;
    const IGTDScript = "python/IGTD.py";
    const testScript = "python/test.py";
    const script1 = spawn("python", [IGTDScript, "test.csv", line_no, "-m"]);
    script1.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    script1.on("close", (code) => {
        console.log(`${IGTDScript} terminated with code ${code}`);
        const script2 = spawn("python", [testScript]);
        script2.stdout.on("data", (data) => {
            console.log(data.toString("utf8"));
        });
        script2.on("close", (code) => {
            console.log(`${testScript} terminated with code ${code}`);
            fs.unlink(`uploads/${filename}`, (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(`${filename} deleted successfully`);
                }
                res.send({ a: 5 });
            });
        });
    });
});

module.exports = apiRouter;
