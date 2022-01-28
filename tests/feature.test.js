process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("/GET Average travel time in a month", () => {
  it("it should get a vehicle's average travel time within a month", async () => {
    let obj = { vehicle_id: 1 };
    let res = await chai
      .request(server)
      .get(`/vehicle/get-average-travel-time/${obj.vehicle_id}`);

    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("message", "Success.");
    res.body.should.have.property("success", true);
    res.body.should.have.property("error", false);
    res.body.should.have.property("data").not.to.be.null;
  });
});

describe("/GET estimated arrival time, given a future date", () => {
  it("it should get a future arrival date, given a future travel date", async () => {
    let obj = {
      date: "2022-02-05 09:32:21",
      latitude: "6.4716100000",
      longitude: "3.6345480000",
    };
    let res = await chai
      .request(server)
      .get(
        `/vehicle/get-estimated-arrival-time/${obj.date}/${obj.latitude}/${obj.longitude}`
      );
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("message", "Success.");
    res.body.should.have.property("success", true);
    res.body.should.have.property("error", false);
    res.body.should.have.property("data").not.to.be.null;
  });
});
