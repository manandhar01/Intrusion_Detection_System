const fs = require("fs");

const createLog = (req, res) => {
    const logFile = "Logs/log.txt";
    let randint = Math.floor(Math.random() * 2);
    if (randint) {
        const attack = true;
        const attackType = Math.floor(Math.random() * 10);
        const timestamp = Date.now();
        log = { attack, timestamp, attackType };
        fs.appendFileSync(logFile, `${timestamp}, ${attackType}\n`);
        res.json(log);
    } else {
        res.json({ attack: false });
    }
};

const getLogs = (req, res) => {
    const logFile = "Logs/log.txt";
    logs = fs.readFileSync(logFile, "utf-8").split("\n").slice(0, -1);
    console.log(logs);
    res.send({ logs });
};

module.exports = { createLog, getLogs };
