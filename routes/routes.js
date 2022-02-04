const router = require("express").Router();
const Factory = require("../dic/factory");
const vehicleController = Factory.vehicleController();
router.get(
  "/vehicles/average-travel-time",
  vehicleController.getVehicleAverageTravelTime
);
router.get(
  "/vehicles/estimated-arrival-time/:date",
  vehicleController.getVehicleEstimatedArrival
);

module.exports = router;
