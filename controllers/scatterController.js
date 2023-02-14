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
        attack: Array(10).fill(0),
        Type11: Array(10).fill(0),
    };
    let categories = Object.keys(categoryCount);
    let logData = [];
    logs.forEach((log) => {
        log = log.slice(0, -1).split(",");
        const timeDifference = Math.floor(
            (currentDate - new Date(log[0]).getTime()) / (1000 * 60)
        );
        const category = parseInt(log[1]);
        if (timeDifference >= 0 && timeDifference < 10) {
            logData.push(log);
            if (categories.includes(`Type${category}`)) {
                categoryCount[`Type${category}`][timeDifference] += 1;
            } else {
                categoryCount[`Type${category}`] = Array(10).fill(0);
                categoryCount[`Type${category}`][timeDifference] += 1;
                categories.push(`Type${category}`);
            }
            if (category !== 11) {
                categoryCount["attack"][timeDifference] += 1;
            }
        }
    });
    res.json({ scatterData: [logData, categoryCount] });
};

module.exports = { getScatterData };
