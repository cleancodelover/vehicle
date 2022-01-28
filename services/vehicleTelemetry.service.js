const db = require("../models");
const logger = require("../logger/index");
const Helpers = require("../helpers/helpers.js");
const { Op } = require("sequelize");
const VehicleBoundaryEventService = require("./vehicleBoundaryEvent.service");

class VehicleTelemetryService extends VehicleBoundaryEventService {
  constructor() {
    super();
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
        attributes: [
          "id",
          "vehicle_id",
          "movement_status",
          "position_latitude",
          "position_longitude",
          "timestamp",
        ],
      });
      if (!result) {
        return {
          message: "No telemetries found for this vehicle.",
          success: false,
          error: false,
          data: null,
        };
      }
      result = result.map((item) => item.get({ plain: true }));
      return {
        message: "Success.",
        success: true,
        error: false,
        data: result,
      };
    } catch (error) {
      console.log(error);
      logger.error(new Error(error));
      return {
        message: "Database error occurred.",
        success: false,
        error: true,
        data: null,
      };
    }
  }

  async getVehicleAverageTravelTimeByVehicleId(vehicleId) {
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
        attributes: [
          "id",
          "vehicle_id",
          "movement_status",
          "position_latitude",
          "position_longitude",
          "timestamp",
        ],
      });
      if (!result) {
        return {
          message: "No telemetries found for this vehicle.",
          success: false,
          error: false,
          data: null,
        };
      }
      result = result.map((item) => item.get({ plain: true }));
      let averageTime = this.helper.getAverageTime(result);
      return {
        message: "Success.",
        success: true,
        error: false,
        data: {
          averageTravelTime: averageTime,
        },
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

  async getVehicleEstimatedArrivalByPosition(futureDate, latitude, longitude) {
    if (!latitude || !longitude) {
      return {
        message: "No location found.",
        success: false,
        error: false,
        data: null,
      };
    }
    if (!futureDate) {
      return {
        message: "Unable to get arrival time with travel date.",
        success: false,
        error: false,
        data: null,
      };
    }

    try {
      let result = await db.VehicleTelemetry.findAll({
        where: {
          [Op.and]: [
            { position_latitude: latitude },
            { position_longitude: longitude },
          ],
        },
        attributes: [
          "id",
          "vehicle_id",
          "movement_status",
          "position_latitude",
          "position_longitude",
          "timestamp",
        ],
      });

      if (!result) {
        return {
          message: "No telemetries found for this vehicle.",
          success: false,
          error: false,
          data: null,
        };
      }
      result = result.map((item) => item.get({ plain: true }));
      let timeStamp =
        this.helper.getAverageTime(result) + new Date(futureDate).getTime();
      let arrivalDate = new Date(timeStamp);
      return {
        message: "Success.",
        success: true,
        error: false,
        data: {
          arrivalDate: arrivalDate,
        },
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
