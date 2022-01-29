const VehicleService = require("../services/vehicle.service");
const vehicleService = new VehicleService();

module.exports = {
  //#region Vehicle
  async getVehicleAverageTravelTime(req, res) {
    let result = await vehicleService.getVehicleAverageTravelTime();
    if (result.error) {
      return res.status(500).json(result);
    } else {
      return res.status(200).json(result);
    }
  },
  async getVehicleEstimatedArrival(req, res) {
    let futureDate = req.params.date;

    let result = await vehicleService.getVehicleEstimatedArrival(futureDate);
    if (result.error) {
      return res.status(500).json(result);
    } else {
      return res.status(200).json(result);
    }
  },
  //#endregion
};
