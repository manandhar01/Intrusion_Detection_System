const fs = require("fs");
const multer = require("multer");
// const { spawn } = require("child_process");
const { predictOne, predictMany } = require("./predictionController");
const {
    formatOneFormCSVCicflowmeter,
    formatManyFormCSVCicflowmeter,
    formatOneFormCSVCicids2017,
    formatManyFormCSVCicids2017,
} = require("./formatController");

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
    const allData = req.body.allData;

    let data = fs.readFileSync(`uploads/${filename}`, "utf-8").split("\n");
    data = data[data.length - 1] === "" ? data.slice(0, -1) : data;
    data = /\d/.test(data[0]) ? data : data.slice(1);

    if (csvformat === "cicflowmeter") {
        if (allData) {
            data = formatManyFormCSVCicflowmeter(data);
        } else {
            data = data[line_no].slice(0, -1);
            data = formatOneFormCSVCicflowmeter(data);
        }
    } else {
        if (allData) {
            data = formatManyFormCSVCicids2017(data);
        } else {
            data = data[line_no].slice(0, -1);
            data = formatOneFormCSVCicids2017(data);
        }
    }

    if (allData) {
        predictMany(data).then((result) => {
            if (result) {
                const predictions = fs
                    .readFileSync("Logs/log_many.txt", "utf-8")
                    .split("\n")
                    .slice(0, -1)
                    .map((prediction) => {
                        return prediction.slice(0, -1).split(",");
                    });
                res.json({ predictions });
            } else {
                res.json({ error: "could not predict" });
            }
        });
    } else {
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
    }
};

module.exports = { formPost, upload, uploadFile };
