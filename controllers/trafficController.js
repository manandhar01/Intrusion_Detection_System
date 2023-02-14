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
    // let prevData = "";
    // console.log(`Watching ${filename} for changes`);
    // fs.watchFile(filename, (curr, prev) => {
    //     fs.readFile(filename, "utf-8", (err, data) => {
    //         if (err) {
    //             console.error(err);
    //         } else {
    //             if (prevData !== data) {
    //                 const newData = data.substring(prevData.length);
    //                 prevData = data;
    //                 const formattedData = formatData(newData);
    //                 predictMany(formattedData).then((result) => {
    //                     if (result) {
    //                         console.log("Prediction complete");
    //                     } else {
    //                         console.log("could not predict");
    //                     }
    //                 });
    //             }
    //         }
    //     });
    // });

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
