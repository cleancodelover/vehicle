const db = require("../models");
const logger = require("../logger/index");
const Helpers = require("../helpers/helpers.js");
const VehicleTelemetryService = require("./vehicleTelemetry.service");

class VehicleService extends VehicleTelemetryService {
  constructor() {
    super();
    this.helper = new Helpers();
  }

  async getVehicleById(vehicleId) {
    if (!vehicleId) {
      return {
        message: "No vehicle found.",
        success: false,
        error: false,
        data: null,
      };
    }
    try {
      let result = await db.Vehicle.findOne({
        where: { id: vehicleId },
      });
      if (!result) {
        return {
          message: "Vehicle not found.",
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

  async getVehicles() {
    try {
      let result = await db.Vehicle.findAll();
      if (!result) {
        return {
          message: "There are no vehicles.",
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
      logger.log(new Error(error));
      return {
        message: "Database connection error.",
        success: false,
        error: true,
        data: null,
      };
    }
  }
}

module.exports = VehicleService;
