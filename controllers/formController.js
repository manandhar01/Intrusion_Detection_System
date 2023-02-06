const fs = require("fs");
const multer = require("multer");
// const { spawn } = require("child_process");
const { predictOne } = require("./predictionController");
const { formatFormCSV } = require("./formatController");

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

const formPost = (req, res) => {
    let data = Object.values(req.body);
    data.forEach((datum, index) => {
        if (datum === "") {
            data[index] = 0;
        }
    });
    predictOne(data).then((result) => {
        if (result) {
            const prediction = fs
                .readFileSync("Logs/log_one.txt", "utf-8")
                .slice(0, -2)
                .split(",");
            if (prediction[2] !== "BENIGN") {
                res.json({
                    prediction: {
                        attack: true,
                        timestamp: parseInt(prediction[0]),
                        class: prediction[2],
                    },
                });
            } else {
                res.json({
                    prediction: {
                        attack: false,
                    },
                });
            }
        } else {
            res.json({ error: "could not predict" });
        }
    });
};

const uploadFile = (req, res) => {
    const line_no = req.body.line_no;
    const filename = req.file.originalname;
    const csvformat = req.body.csvformat;
    let data = fs
        .readFileSync(`uploads/${filename}`, "utf-8")
        .split("\n")
        [line_no].slice(0, -1);
    if (csvformat === "cicflowmeter") {
        data = formatFormCSV(data);
    }
    predictOne(data).then((result) => {
        if (result) {
            const prediction = fs
                .readFileSync("Logs/log_one.txt", "utf-8")
                .slice(0, -2)
                .split(",");
            if (prediction[2] !== "BENIGN") {
                res.json({
                    prediction: {
                        attack: true,
                        timestamp: parseInt(prediction[0]),
                        class: prediction[2],
                    },
                });
            } else {
                res.json({
                    prediction: {
                        attack: false,
                    },
                });
            }
        } else {
            res.json({ error: "could not predict" });
        }
    });
};

module.exports = { formPost, upload, uploadFile };
