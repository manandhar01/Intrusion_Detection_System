const express = require("express");
const { createLog, getLogs } = require("../controllers/logController");
const { getScatterData } = require("../controllers/scatterController");
const {
    formPost,
    upload,
    uploadFile,
} = require("../controllers/formController");

const apiRouter = express.Router();

// Form related URLs
apiRouter.post("/formpost", formPost);
apiRouter.post("/upload_file", upload, uploadFile);

// Logs
apiRouter.get("/test", createLog);
apiRouter.get("/get-logs", getLogs);

// ScatterPlot
apiRouter.get("/get-scatterData", getScatterData);

module.exports = apiRouter;
