process.env.NODE_ENV = "test";
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");
const should = chai.should();

chai.use(chaiHttp);

describe("/GET Average travel time in a month", () => {
  it("it should get a vehicle's average travel time within a month", async () => {
    let res = await chai.request(server).get(`/vehicles/average-travel-time`);

    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("message", "Success.");
    res.body.should.have.property("success", true);
    res.body.should.have.property("error", false);
    res.body.should.have.property("data").to.be.an("array");
    res.body.should.have.property("data").not.to.be.empty;
  });
});

describe("/GET estimated arrival time, given a future date", () => {
  it("it should get a future arrival date, given a future travel date", async () => {
    let obj = {
      date: "2022-02-05 09:32:21",
    };
    let res = await chai
      .request(server)
      .get(`/vehicles/estimated-arrival-time/${obj.date}`);
    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("message", "Success.");
    res.body.should.have.property("success", true);
    res.body.should.have.property("error", false);
    res.body.should.have.property("data").not.to.be.a("string");
  });
});
