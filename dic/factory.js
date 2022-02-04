const Helpers = require("../helpers/Helpers.js");
const VehicleService = require("../services/vehicle.service");
const VehicleBoundaryEventService = require("../services/vehicleBoundaryEvent.service");
const VehicleTelemetryService = require("../services/vehicleTelemetry.service");
const db = require("../models");
const logger = require("../logger");
const VehicleController = require("../controllers/vehicles.controller.js");

class Factory {
  static vehicleService() {
    return new VehicleService(db, this.helper(), logger);
  }
  static vehicleBoundaryEventsService() {
    return new VehicleBoundaryEventService(db, this.helper(), logger);
  }
  static vehicleTelemetryService() {
    return new VehicleTelemetryService(db, this.helper(), logger);
  }
  static vehicleController() {
    return new VehicleController(db, this.helper(), logger);
  }
  static vehicleController() {
    return new VehicleController(db, this.helper(), logger);
  }
  static helper() {
    return new Helpers();
  }
}

module.exports = Factory;
