const { spawn } = require("child_process");

const getMonitorState = async (req, res) => {
    const process = spawn("ps ax | grep cicflowmeter | wc -l", { shell: true });
    process.stdout.on("data", (data) => {
        if (parseInt(data.toString("utf8")) > 1) {
            res.json({ state: 1 });
        } else {
            res.json({ state: 0 });
        }
    });
};

const startMonitoring = (req, res) => {
    const interface = "wlp3s0";
    const csvFile = "Logs/capture.csv";
    const cicflowmeter = spawn(
        `sudo cicflowmeter -i ${interface} -c ${csvFile}`,
        { shell: true }
    );
    cicflowmeter.stdout.on("data", (data) => {
        console.log("Stdout", data.toString("utf8"));
    });
    cicflowmeter.stderr.on("data", (data) => {
        console.log("Stderr", data.toString("utf8"));
    });
    res.json({ ok: true, state: 1 });
};

module.exports = { getMonitorState, startMonitoring };
