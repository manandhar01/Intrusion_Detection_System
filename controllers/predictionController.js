// const predictionFile = "python/test.py";

const predictOne = (data) => {
    // TODO ---> Feed this new data to the actual machine learning model in order to predict
    if (Math.floor(Math.random() * 2)) {
        const predictedClass = Math.floor(Math.random() * 10);
        return { attack: true, timestamp: Date.now(), class: predictedClass };
    } else {
        return { attack: false };
    }
    // const predict = spawn(`python ${predictionFile} ${data}`, { shell: true });
    // predict.stdout.on("data", (data) => {
    //     console.log(data.toString("utf8"));
    // });
    // predict.on("close", (code) => {
    //     return predictedClass;
    // });
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
