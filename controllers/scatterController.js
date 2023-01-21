const logFile = ''

const getScatterData = (req, res) => {
    let scatterData = [[], []];
    res.json({ scatterData });
};

module.exports = { getScatterData };
