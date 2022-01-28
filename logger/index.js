const developmentLogger = require("./dev-logger");
const productionLogger = require("./prod-logger");
let logger = null;

if (process.env.NODE_ENV === "development") {
  logger = developmentLogger();
} else {
  logger = productionLogger();
}
module.exports = logger;
