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
    let attackCounts = Array(10).fill(0);
    let normalCounts = Array(10).fill(0);
    let attackType0Counts = Array(10).fill(0);
    let attackType1Counts = Array(10).fill(0);
    let attackType2Counts = Array(10).fill(0);
    let attackType3Counts = Array(10).fill(0);
    let attackType4Counts = Array(10).fill(0);
    let attackType5Counts = Array(10).fill(0);
    let attackType6Counts = Array(10).fill(0);
    let attackType7Counts = Array(10).fill(0);
    let attackType8Counts = Array(10).fill(0);
    let attackType9Counts = Array(10).fill(0);
    logs.forEach((l) => {
        const timeDifference = Math.floor(
            (currentDate - parseInt(l.split(",")[0])) / (1000 * 60)
        );
        const attackType = parseInt(l.split(",")[1]);
        if (timeDifference >= 0 && timeDifference < 10) {
            attackCounts[timeDifference] += 1;
            normalCounts[timeDifference] += Math.floor(Math.random() * 5);
            switch (attackType) {
                case 0:
                    attackType0Counts[timeDifference] += 1;
                    break;
                case 1:
                    attackType1Counts[timeDifference] += 1;
                    break;
                case 2:
                    attackType2Counts[timeDifference] += 1;
                    break;
                case 3:
                    attackType3Counts[timeDifference] += 1;
                    break;
                case 4:
                    attackType4Counts[timeDifference] += 1;
                    break;
                case 5:
                    attackType5Counts[timeDifference] += 1;
                    break;
                case 6:
                    attackType6Counts[timeDifference] += 1;
                    break;
                case 7:
                    attackType7Counts[timeDifference] += 1;
                    break;
                case 8:
                    attackType8Counts[timeDifference] += 1;
                    break;
                case 9:
                    attackType9Counts[timeDifference] += 1;
                    break;
            }
        }
    });
    let scatterData = [
        attackCounts,
        normalCounts,
        attackType0Counts,
        attackType1Counts,
        attackType2Counts,
        attackType3Counts,
        attackType4Counts,
        attackType5Counts,
        attackType6Counts,
        attackType7Counts,
        attackType8Counts,
        attackType9Counts,
    ];
    res.json({ scatterData });
};

module.exports = { getScatterData };
