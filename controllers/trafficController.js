const csvtojson = require("csvtojson");
const { spawn } = require("child_process");

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
    console.log(`Watching ${filename} for changes`);
    const watchProcess = spawn(
        `python "AI/omniglot-fewshot/predict_captured.py"`,
        { shell: true, env: { ...process.env, PYTHONPATH: "./AI" } }
    );
    watchProcess.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    watchProcess.stderr.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    watchProcess.on("close", () => {
        console.log(`Stopped watching ${filename}`);
    });
};

module.exports = { getTrafficData, watchCaptureFile };
