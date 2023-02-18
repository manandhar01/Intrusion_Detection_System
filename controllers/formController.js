const fs = require("fs");
const multer = require("multer");
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
            res.json({
                prediction: {
                    timestamp: prediction[0],
                    predictedCategory: prediction[1],
                    categoryLabel: prediction[2],
                },
            });
        } else {
            res.json({ error: "could not predict" });
        }
    });
};

const uploadFile = (req, res) => {
    const line_no = parseInt(req.body.line_no);
    const filename = req.file.originalname;
    const csvformat = req.body.csvformat;
    const allData = req.body.allData === "true" ? true : false;

    let data = fs.readFileSync(`uploads/${filename}`, "utf-8").split("\n");
    data = data[data.length - 1] === "" ? data.slice(0, -1) : data;
    data = /\d/.test(data[0]) ? data : data.slice(1);
    let label = [];

    if (csvformat === "cicflowmeter") {
        if (allData) {
            data = formatManyFormCSVCicflowmeter(data);
        } else {
            data = data[line_no];
            data = formatOneFormCSVCicflowmeter(data);
        }
    } else {
        if (allData) {
            const data_and_label = formatManyFormCSVCicids2017(data);
            data = [];
            data_and_label.forEach((dl) => {
                data.push(dl["data"]);
                label.push(dl["label"]);
            });
        } else {
            data = data[line_no].slice(0, -1);
            const data_and_label = formatOneFormCSVCicids2017(data);
            data = data_and_label["data"];
            label = data_and_label["label"];
        }
    }

    if (allData) {
        predictMany(data, 1).then((result) => {
            if (result) {
                const predictions = fs
                    .readFileSync("Logs/log_many.txt", "utf-8")
                    .split("\n")
                    .slice(0, -1)
                    .map((prediction) => {
                        return prediction.slice(0, -1).split(",");
                    });
                res.json({ predictions, label });
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

                res.json({
                    prediction: {
                        timestamp: prediction[0],
                        predictedCategory: prediction[1],
                        categoryLabel: prediction[2],
                    },
                });
            } else {
                res.json({ error: "could not predict" });
            }
        });
    }
};

module.exports = { formPost, upload, uploadFile };
