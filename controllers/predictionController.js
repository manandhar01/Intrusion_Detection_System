const { spawn } = require("child_process");
const predictionFile = "AI/omniglot-fewshot/frame.py";

const predictOne = (data) => {
    const predict = spawn(`python ${predictionFile} ${data} 1`, {
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

const predictMany = (data, x = 0) => {
    let command = `python ${predictionFile} ${data}`;
    if (x) {
        command = `python ${predictionFile} ${data} 2`;
    }
    const predict = spawn(command, {
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

module.exports = { predictOne, predictMany };
