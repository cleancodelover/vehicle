const router = require("express").Router();
const imports = require("./imports");
router.get(
  "/vehicle/get-average-travel-time",
  imports.getVehicleAverageTravelTime
);
router.get(
  "/vehicle/get-estimated-arrival-time",
  imports.getVehicleEstimatedArrival
);

module.exports = router;
