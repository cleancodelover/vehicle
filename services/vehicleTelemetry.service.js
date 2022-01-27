const db = require("../models");
const logger = require("../logger/index");
const Helpers = require("../helpers/helpers.js");

class VehicleTelemetryService {
  constructor() {
    this.helper = new Helpers();
  }

  async getVehicleTelemetriesByVehicleId(vehicleId) {
    if (!vehicleId) {
      return {
        message: "No telemetries found for this vehicle.",
        success: false,
        error: false,
        data: null,
      };
    }
    try {
      let result = await db.VehicleTelemetry.findAll({
        where: { vehicle_id: vehicleId },
      });
      if (!result) {
        return {
          message: "No telemetries found for this vehicle.",
          success: false,
          error: false,
          data: null,
        };
      }
      return {
        message: "Success.",
        success: true,
        error: false,
        data: result,
      };
    } catch (error) {
      logger.error(new Error(error));
      return {
        message: "Database error occurred.",
        success: false,
        error: true,
        data: null,
      };
    }
  }
}

module.exports = VehicleTelemetryService;
