const predictionFile = "python/test.py";

const predictOne = (data) => {
    let predictedClass = 0;
    const predict = spawn(`python ${predictionFile} ${data}`, { shell: true });
    predict.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    predict.on("close", (code) => {
        return predictedClass;
    });
};

const predictMany = (data) => {
    let predictedClasses = Array(data.length).fill(0);
    const predict = spawn(`python ${predictionFile} ${data}`, { shell: true });
    predict.stdout.on("data", (data) => {
        console.log(data.toString("utf8"));
    });
    predict.on("close", (code) => {
        return predictedClasses;
    });
};

module.exports = { predictOne, predictMany };
