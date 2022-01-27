const db = require("../models");
const logger = require("../logger/index");
const Helpers = require("../helpers/helpers.js");

class VehicleBoundaryEventService {
  constructor() {
    this.helper = new Helpers();
  }

  async getVehicleBoundaryEventsByVehicleId(vehicleId) {
    if (!vehicleId) {
      return {
        message: "No events found for this vehicle.",
        success: false,
        error: false,
        data: null,
      };
    }
    try {
      let result = await db.VehicleBoundaryEvent.findOne({
        where: { vehicle_id: vehicleId },
      });
      if (!result) {
        return {
          message: "No events found for this vehicle.",
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

module.exports = VehicleBoundaryEventService;
