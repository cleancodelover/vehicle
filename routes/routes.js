const router = require("express").Router();
const imports = require("./imports");
router.get(
  "/vehicle/get-average-travel-time/:id",
  imports.getVehicleAverageTravelTime
);
router.get(
  "/vehicle/get-estimated-arrival-time/:date/:lat/:long",
  imports.getVehicleEstimatedArrival
);

module.exports = router;
