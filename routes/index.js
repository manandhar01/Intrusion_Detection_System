const express = require("express");
const { createLog, getLogs } = require("../controllers/logController");
const { getScatterData } = require("../controllers/scatterController");
const { getTrafficData } = require("../controllers/trafficController");
const {
    formPost,
    upload,
    uploadFile,
} = require("../controllers/formController");
const {
    getMonitorState,
    startMonitoring,
} = require("../controllers/monitorController");

const apiRouter = express.Router();

// Traffic
apiRouter.get("/getTrafficData", getTrafficData);

// Monitor
apiRouter.get("/getMonitorState", getMonitorState);
apiRouter.post("/startMonitoring", startMonitoring);

// Form related URLs
apiRouter.post("/formpost", formPost);
apiRouter.post("/upload_file", upload, uploadFile);

// Logs
apiRouter.get("/test", createLog);
apiRouter.get("/get-logs", getLogs);

// ScatterPlot
apiRouter.get("/get-scatterData", getScatterData);

module.exports = apiRouter;
