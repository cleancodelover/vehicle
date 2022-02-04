class VehicleController {
  constructor(db, helper, logger, factory) {
    this.db = db;
    this.helper = helper;
    this.logger = logger;
    this.factory = factory;

    this.vehicleService = factory.vehicleService(
      this.db,
      this.helper,
      this.logger
    );
  }
  //#region Vehicle
  async getVehicleAverageTravelTime(req, res) {
    let result = await this.vehicleService.getVehicleAverageTravelTime();
    if (result.error) {
      return res.status(500).json(result);
    } else {
      return res.status(200).json(result);
    }
  }
  async getVehicleEstimatedArrival(req, res) {
    let futureDate = req.params.date;

    let result = await this.vehicleService.getVehicleEstimatedArrival(
      futureDate
    );
    if (result.error) {
      return res.status(500).json(result);
    } else {
      return res.status(200).json(result);
    }
  }
  //#endregion
}

module.exports = VehicleController;
