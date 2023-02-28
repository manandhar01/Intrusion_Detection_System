const fs = require("fs");

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

module.exports = { createLog, getLogData };
