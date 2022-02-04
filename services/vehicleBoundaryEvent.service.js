class VehicleBoundaryEventService {
  constructor(db, helper, logger) {
    this.helper = helper;
    this.db = db;
    this.logger = logger;
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
