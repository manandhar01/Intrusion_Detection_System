const csvtojson = require("csvtojson");

const filename = "Logs/capture.csv";

const getTrafficData = (req, res) => {
    const index = req.query.dataCount;
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
            d = d.slice(index);
            res.json({ data: d, cols: cols });
        });
};

module.exports = { getTrafficData };
