const { spawn } = require("child_process");

const getMonitorState = async (req, res) => {
    let state = 0;
    let d = "";
    const process = spawn("ps", ["-e"]);
    process.stdout.on("data", (data) => {
        d = d.concat(data.toString("utf8"));
    });
    process.on("exit", () => {
        if (d.includes("nautilus")) {
            state = 1;
        }
        res.json({ state, abc: d });
    });
};

const startMonitoring = (req, res) => {
    const process = spawn("nautilus", ["&"]);
    process.on("exit", () => {
        console.log("exited");
        res.json({ ok: true, state: 1 });
    });
};

module.exports = { getMonitorState, startMonitoring };
