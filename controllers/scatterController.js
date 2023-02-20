const fs = require("fs");

const logFile = "Logs/log.txt";

const getScatterData = (req, res) => {
    const logs = fs
        .readFileSync(logFile, {
            encoding: "utf-8",
        })
        .split("\n")
        .slice(0, -1);
    const currentDate = Date.now();
    let categoryCount = {
        attack: Array(60).fill(0),
        BENIGN: Array(60).fill(0),
    };
    let categories = Object.keys(categoryCount);
    let logData = [];
    logs.forEach((log) => {
        log = log.slice(0, -1).split(",");
        const timeDifference = Math.floor(
            (currentDate - new Date(log[0]).getTime()) / 1000
        );
        const category = log[2];
        if (timeDifference >= 0 && timeDifference < 60) {
            logData.push(log);
            if (categories.includes(category)) {
                categoryCount[category][timeDifference] += 1;
            } else {
                categoryCount[category] = Array(60).fill(0);
                categoryCount[category][timeDifference] += 1;
                categories.push(category);
            }
            if (category !== "BENIGN") {
                categoryCount["attack"][timeDifference] += 1;
            }
        }
    });
    res.json({ scatterData: [logData, categoryCount] });
};

module.exports = { getScatterData };
