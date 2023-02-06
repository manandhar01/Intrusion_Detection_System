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

const predictMany = (data) => {
    const predict = spawn(`python ${predictionFile} ${data}`, {
        shell: true,
        env: { ...process.env, PYTHONPATH: "./AI" },
    });
    console.log("In JS...");
    console.log(data);
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
