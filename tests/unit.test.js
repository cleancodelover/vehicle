process.env.NODE_ENV = "test";
const chai = require("chai");
const VehicleService = require("../services/vehicle.service");
const Helpers = require("../helpers/Helpers");

describe("Check Average travel time in a month", () => {
  const vehicleService = new VehicleService();
  const helpers = new Helpers();
  const obj = { vehicle_id: 1 };

  it("check if the vehicle has telemetries recorded", async () => {
    let telemetries = await vehicleService.getVehicleTelemetriesByVehicleId(
      obj.vehicle_id
    );
    telemetries.data.should.be.an("array");
    telemetries.success.should.be.true;
    telemetries.error.should.be.false;
  });

  it("check if the the average telemetries is computed.", async () => {
    let telemetries = await vehicleService.getVehicleTelemetriesByVehicleId(
      obj.vehicle_id
    );
    let averageTime = await helpers.getAverageTime(telemetries);
    averageTime.should.not.be.lessThan(0);
  });

  it("check vehicle average telemetries monthly travel time is returned.", async () => {
    let travelTime =
      await vehicleService.getVehicleAverageTravelTimeByVehicleId(
        obj.vehicle_id
      );

    travelTime.data.should.be.a("object");
    travelTime.success.should.be.true;
    travelTime.error.should.be.false;

    let data = travelTime.data;
    data.averageTravelTime.should.not.be.lessThan(0);
  });
});

describe("Check future travel arrival time", () => {
  const vehicleService = new VehicleService();
  let obj = {
    date: "2022-02-05 09:32:21",
    latitude: "6.4716100000",
    longitude: "3.6345480000",
  };

  it("check if the future date is gotten", async () => {
    const futureDate =
      await vehicleService.getVehicleEstimatedArrivalByPosition(
        obj.date,
        obj.latitude,
        obj.longitude
      );
    futureDate.error.should.be.false;
    futureDate.success.should.be.true;
    futureDate.data.should.be.a("object");

    let data = futureDate.data;
    data.arrivalDate.should.be.a("date");
  });
});
