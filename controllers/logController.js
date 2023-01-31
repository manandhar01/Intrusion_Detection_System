const fs = require("fs");

const logFile = "Logs/log.txt";

const createLog = () => {
    const logFile = "Logs/log.txt";
    let randint = Math.floor(Math.random() * 2);
    if (randint) {
        const attack = true;
        const attackType = Math.floor(Math.random() * 10);
        const timestamp = Date.now();
        log = { attack, timestamp, attackType };
        fs.appendFileSync(logFile, `${timestamp}, ${attackType}\n`);
    }
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
    setInterval(createLog, 5000);
};

module.exports = { generateDummyLogData, createLog, getLogData };
