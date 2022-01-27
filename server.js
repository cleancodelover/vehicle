require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const PORT = process.env.APP_PORT || 3000;
const appRouter = require("./routes/routes.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/", appRouter);
app.listen(PORT, () => {
  console.log(`listening on: localhost:${PORT}`);
});
