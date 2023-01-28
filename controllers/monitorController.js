const { spawn } = require("child_process");
const { Observable } = require("rxjs");

const getProessCount = new Observable((subscriber) => {
    const process = spawn("ps -e | grep [c]icflowmeter | wc -l", {
        shell: true,
    });
    process.stdout.on("data", (data) => {
        subscriber.next(parseInt(data.toString("utf8")));
    });
    process.on("close", () => {
        subscriber.complete();
    });
});

const getMonitorState = (req, res) => {
    getProessCount.subscribe((processCount) => {
        if (processCount) {
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
    const handle = setInterval(() => {
        getProessCount.subscribe((processCount) => {
            if (processCount) {
                clearInterval(handle);
                console.log("cicflowmeter started");
                res.json({ ok: true, state: 1 });
            }
        });
    }, 1000);
};

module.exports = { getMonitorState, startMonitoring };
