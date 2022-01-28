const db = require("../models");
const logger = require("../logger/index");
const Helpers = require("../helpers/helpers.js");
const VehicleTelemetryService = require("./vehicleTelemetry.service");

class VehicleService extends VehicleTelemetryService {
  constructor() {
    super();
  }
  //functions are extended from vehicleTelemetry.service.js and vehicleBoundaryEvent.service.js classes.
}

module.exports = VehicleService;
