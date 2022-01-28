const VehicleService = require("../services/vehicle.service");
const vehicleService = new VehicleService();

module.exports = {
  //#region Vehicle
  async getVehicleAverageTravelTime(req, res) {
    let vehicleId = req.params.id;
    let result = await vehicleService.getVehicleAverageTravelTimeByVehicleId(
      vehicleId
    );
    if (result.error) {
      return res.status(500).json(result);
    } else {
      return res.status(200).json(result);
    }
  },
  async getVehicleEstimatedArrival(req, res) {
    let futureDate = req.params.date;
    let latitude = req.params.lat;
    let longitude = req.params.long;

    let result = await vehicleService.getVehicleEstimatedArrivalByPosition(
      futureDate,
      latitude,
      longitude
    );
    if (result.error) {
      return res.status(500).json(result);
    } else {
      return res.status(200).json(result);
    }
  },
  //#endregion
};
