const { spawn } = require("child_process");
const predictionFile = "AI/omniglot-fewshot/predictFormData.py";

const predictOne = (filename, line_no = 0) => {
    const predict = spawn(`python ${predictionFile} ${filename} ${line_no}`, {
        shell: true,
        env: { ...process.env, PYTHONPATH: "./AI" },
    });
    predict.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    predict.stderr.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    return new Promise((resolve, reject) => {
        predict.on("close", (code) => {
            resolve(true);
        });
    });
};

const predictMany = (filename, line_no, fileFormat) => {
    const predict = spawn(
        `python ${predictionFile} ${filename} ${line_no} ${fileFormat}`,
        {
            shell: true,
            env: { ...process.env, PYTHONPATH: "./AI" },
        }
    );
    predict.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    predict.stderr.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    return new Promise((resolve, reject) => {
        predict.on("close", (code) => {
            resolve(true);
        });
    });
};

module.exports = { predictOne, predictMany };
