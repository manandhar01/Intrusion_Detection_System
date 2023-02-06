const fs = require("fs");
const csvtojson = require("csvtojson");

const logFile = "Logs/log.txt";

const createLog = (prediction) => {
    fs.appendFileSync(
        logFile,
        `${prediction.timestamp}, ${prediction.class}\n`
    );
};

const getLogData = (req, res) => {
    const index = req.query.logCount;
    fs.readFile(logFile, "utf-8", (err, data) => {
        if (err) {
            console.error(err);
        } else {
            data = data.split("\n").slice(index, -1);
            res.json({ logs: data });
        }
    });
};

const generateDummyLogData = () => {
    setInterval(() => {
        if (Math.floor(Math.random() * 2)) {
            const predictedClass = Math.floor(Math.random() * 10);
            createLog({
                attack: true,
                timestamp: Date.now(),
                class: predictedClass,
            });
        }
    }, 5000);
};

module.exports = { generateDummyLogData, createLog, getLogData };
