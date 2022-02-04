const VehicleTelemetryService = require("./vehicleTelemetry.service");

class VehicleService extends VehicleTelemetryService {
  constructor(db, helper, logger) {
    super(db, helper, logger);
    this.helper = helper;
    this.db = db;
    this.logger = logger;
  }
  //functions are extended from vehicleTelemetry.service.js
  //and vehicleBoundaryEvent.service.js classes.
}

module.exports = VehicleService;
