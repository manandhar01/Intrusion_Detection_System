const express = require("express");
const { getLogData } = require("../controllers/logController");
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
    stopMonitoring,
} = require("../controllers/monitorController");

const apiRouter = express.Router();

// Traffic
apiRouter.get("/getTrafficData", getTrafficData);

// Monitor
apiRouter.get("/getMonitorState", getMonitorState);
apiRouter.post("/startMonitoring", startMonitoring);
apiRouter.post("/stopMonitoring", stopMonitoring);

// Form related URLs
apiRouter.post("/formpost", formPost);
apiRouter.post("/upload_file", upload, uploadFile);

// Logs
apiRouter.get("/getLogData", getLogData);

// ScatterPlot
apiRouter.get("/get-scatterData", getScatterData);

module.exports = apiRouter;
