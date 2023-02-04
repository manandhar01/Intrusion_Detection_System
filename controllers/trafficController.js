const fs = require("fs");
const csvtojson = require("csvtojson");
const { formatData } = require("./formatController");
const { predictMany } = require("./predictionController");
// const { createLog } = require("./logController");

const filename = "Logs/capture.csv";

const getTrafficData = (req, res) => {
    const index = req.query.dataCount;
    csvtojson()
        .fromFile(filename)
        .then((data) => {
            let d = [];
            let cols = [];
            if (data.length) {
                data.forEach((datum) => {
                    d.push(Object.values(datum));
                });
                cols = Object.keys(data[0]);
            }
            d = d.slice(index);
            res.json({ data: d, cols: cols });
        });
};

const watchCaptureFile = () => {
    let prevData = "";
    console.log(`Watching ${filename} for changes`);
    fs.watchFile(filename, (curr, prev) => {
        fs.readFile(filename, "utf-8", (err, data) => {
            if (err) {
                console.error(err);
            } else {
                if (prevData !== data) {
                    const newData = data.substring(prevData.length);
                    prevData = data;
                    const formattedData = formatData(newData);
                    predictMany(formattedData);
                }
            }
        });
    });
};

module.exports = { getTrafficData, watchCaptureFile };
