class Helpers {
  constructor() {}
  getAverageTime(telemetries) {
    if (!telemetries) return 0;
    if (telemetries.length <= 0) return 0;

    let consecutiveWaitings = [];
    let consecutiveMovements = [];
    let waitingCount = 0;
    let movementCount = 0;

    let tmp = {};

    for (let i = 1; i <= telemetries.length; i++) {
      if (telemetries[i - 1].movement_status == false) waitingCount++;

      if (telemetries[i - 1].movement_status == true) movementCount++;

      if (
        telemetries[i - 1].movement_status === false &&
        !Object.keys(tmp).length
      ) {
        tmp.waitingStarts = telemetries[i - 1].timestamp;
      }
      if (
        telemetries[i - 1].movement_status === true &&
        !Object.keys(tmp).length
      ) {
        tmp.movementStarts = telemetries[i - 1].timestamp;
      }
      if (!telemetries[i] && telemetries[i - 1].movement_status === true) {
        tmp.movementEnds = parseInt(telemetries[i - 1].timestamp);
        consecutiveMovements.push(tmp);
        tmp = {};
        break;
      }
      if (!telemetries[i] && telemetries[i - 1].movement_status === false) {
        tmp.waitingEnds = parseInt(telemetries[i - 1].timestamp);
        consecutiveWaitings.push(tmp);
        tmp = {};
        break;
      }
      if (
        telemetries[i - 1].movement_status !== telemetries[i].movement_status &&
        telemetries[i - 1].movement_status == true &&
        Object.keys(tmp).length
      ) {
        tmp.movementEnds = telemetries[i - 1].timestamp;
        consecutiveMovements.push(tmp);
        tmp = {};
      }
      if (
        telemetries[i - 1].movement_status !== telemetries[i].movement_status &&
        telemetries[i - 1].movement_status === false &&
        Object.keys(tmp).length
      ) {
        tmp.waitingEnds = telemetries[i - 1].timestamp;
        consecutiveWaitings.push(tmp);
        tmp = {};
      }
    }

    let totalWaitingTime = 0;
    for (let i = 0; i < consecutiveWaitings.length; i++) {
      totalWaitingTime =
        totalWaitingTime +
        (parseInt(consecutiveWaitings[i].waitingEnds) -
          parseInt(consecutiveWaitings[i].waitingStarts));
    }

    let totalMovementTime = 0;
    for (let i = 0; i < consecutiveMovements.length; i++) {
      totalMovementTime =
        totalMovementTime +
        (parseInt(consecutiveMovements[i].movementEnds) -
          parseInt(consecutiveMovements[i].movementStarts));
    }
    return (
      totalWaitingTime / waitingCount + totalMovementTime / movementCount ?? 0
    );
  }
}
module.exports = Helpers;
