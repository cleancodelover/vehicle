process.env.NODE_ENV = "test";
const chai = require("chai");
const db = require("../models");
const logger = require("../logger");
const Factory = require("../dic/factory");

describe("Check Average travel time in a month", () => {
  const vehicleService = Factory.vehicleService(db, Factory.helper(), logger);
  const helpers = Factory.helper();

  it("check if the average time is computed.", async () => {
    let telemetries = await vehicleService.getVehicleTelemetries();
    let averageTime = await helpers.getAverageTime(telemetries);
    averageTime.should.not.be.lessThan(0);
  });

  it("check if the future time is computed.", async () => {
    let telemetries = await vehicleService.getVehicleTelemetries();
    let averageTime = await helpers.getAverageTravelTime(telemetries);
    averageTime.should.not.be.a("date");
  });

  it("check vehicle average telemetries monthly travel time is returned.", async () => {
    let travelTime = await vehicleService.getVehicleTelemetries();

    travelTime.data.should.be.an("array");
    travelTime.should.have.property("message", "Success.");
    travelTime.should.have.property("success", true);
    travelTime.should.have.property("error", false);
    travelTime.should.have.property("data").to.be.an("array");
    travelTime.should.have.property("data").not.to.be.empty;
  });
});

describe("Check future travel arrival time", () => {
  const vehicleService = Factory.vehicleService(db, Factory.helper(), logger);
  let obj = {
    date: "2022-02-05 09:32:21",
  };

  it("check if the future date is gotten", async () => {
    const futureDate = await vehicleService.getVehicleEstimatedArrival(
      obj.date
    );
    futureDate.error.should.be.false;
    futureDate.success.should.be.true;
    futureDate.data.should.be.a("object");
    let data = futureDate.data;
    data.arrivalDate.should.be.a("string");
  });
});
