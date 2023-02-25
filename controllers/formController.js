const fs = require("fs");
const multer = require("multer");
const { predictOne, predictMany } = require("./predictionController");

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
    data = data.toString();
    fs.writeFileSync("uploads/formData.csv", data);
    predictOne("uploads/formData.csv").then((result) => {
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
    const filename = req.file.originalname;
    const csvformat = req.body.csvformat;
    const allData = req.body.allData === "true" ? true : false;
    const line_no = allData ? 0 : parseInt(req.body.line_no);

    predictMany(filename, line_no, csvformat).then((result) => {
        if (result) {
            let label = [];
            if (allData) {
                let predictions = fs
                    .readFileSync("Logs/log_many.txt", "utf-8")
                    .split("\n")
                    .slice(0, -1)
                    .map((prediction) => prediction.slice(0, -1).split(","));
                if (predictions[0].length == 4) {
                    label = predictions.map((p) => p[3]);
                    predictions = predictions.map((p) => p.slice(0, 3));
                }
                res.json({
                    predictions,
                    label,
                });
            } else {
                const prediction = fs
                    .readFileSync("Logs/log_one.txt", "utf-8")
                    .slice(0, -2)
                    .split(",");
                res.json({
                    prediction: {
                        timestamp: prediction[0],
                        predictedCategory: prediction[1],
                        categoryLabel: prediction[2],
                        label:
                            prediction.length == 4 ? prediction[3] : undefined,
                    },
                });
            }
        } else {
            res.json({ error: "could not predict" });
        }
        if (fs.existsSync(`uploads/${filename}`)) {
            fs.unlink(`uploads/${filename}`, (err) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(`${filename} deleted`);
                }
            });
        }
    });
};

module.exports = { formPost, upload, uploadFile };
