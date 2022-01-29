const db = require("../models");
const logger = require("../logger/index");
const Helpers = require("../helpers/helpers.js");

const VehicleBoundaryEventService = require("./vehicleBoundaryEvent.service");

class VehicleTelemetryService extends VehicleBoundaryEventService {
  constructor() {
    super();
    this.helper = new Helpers();
  }

  async getVehicleTelemetries() {
    try {
      let result = await db.VehicleTelemetry.findAll({
        attributes: ["id", "vehicle_id", "timestamp"],
        include: [
          {
            model: db.VehicleBoundaryEvent,
            as: "boundaryEvents",
            required: false,
            attributes: ["id", "boundary_id", "detected_event"],
            include: [
              {
                model: db.Boundary,
                as: "boundary",
                required: false,
                attributes: ["id", "name"],
              },
            ],
          },
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
      logger.error(new Error(error));
      return {
        message: "Database error occurred.",
        success: false,
        error: true,
        data: null,
      };
    }
  }

  async getVehicleAverageTravelTime() {
    try {
      let result = await db.VehicleTelemetry.findAll({
        attributes: ["id", "vehicle_id", "timestamp"],
        include: [
          {
            model: db.VehicleBoundaryEvent,
            as: "boundaryEvents",
            required: false,
            attributes: ["id", "boundary_id", "detected_event"],
            include: [
              {
                model: db.Boundary,
                as: "boundary",
                required: false,
                attributes: ["id", "name"],
              },
            ],
          },
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
      let averageTime = this.helper.getAverageTravelTime(result);
      return {
        message: "Success.",
        success: true,
        error: false,
        data: averageTime,
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

  async getVehicleEstimatedArrival(futureDate) {
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
        attributes: ["id", "vehicle_id", "timestamp"],
        include: [
          {
            model: db.VehicleBoundaryEvent,
            as: "boundaryEvents",
            required: false,
            attributes: ["id", "boundary_id", "detected_event"],
            include: [
              {
                model: db.Boundary,
                as: "boundary",
                required: false,
                attributes: ["id", "name"],
              },
            ],
          },
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
      let arrivalDate = this.helper.getDateTime(timeStamp);
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
