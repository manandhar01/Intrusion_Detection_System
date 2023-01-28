const fs = require("fs");
const csvtojson = require("csvtojson");

const filename = "Logs/capture.csv";

const sendTraffic = (socket) => {
    fs.watchFile(filename, () => {
        csvtojson()
            .fromFile(filename)
            .then((data) => {
                let d = [];
                let cols = [];
                if (data.length) {
                    data.forEach((datum) => {
                        d.push(Object.values(datum));
                    });
                    cols = Object.keys(data[0]);
                }
                socket.emit("sent from the server", d, cols);
            });
    });
    console.log(`User connected: ${socket.id}`);
};

module.exports = { sendTraffic };
