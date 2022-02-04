const db = require("../models");
const logger = require("../logger");
const VehicleController = require("../controllers/vehicles.controller.js");
const Factory = require("../dic/factory");

class ControllerFactory {
  static vehicleController() {
    return new VehicleController(db, Factory.helper(), logger);
  }
}

module.exports = ControllerFactory;
