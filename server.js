require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.APP_PORT || 3000;
const appRouter = require("./routes/routes.js");
const logger = require("./logger/index");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", appRouter);
app.listen(PORT, () => {
  logger.info(`listening on: localhost:${PORT}`);
});

module.exports = app;
