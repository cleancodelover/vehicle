class Helpers {
  constructor() {}

  getAverageTime(telemetries) {
    if (!telemetries) return 0;
    if (telemetries.length <= 0) return 0;

    let boundaryEvents = [];
    let waitingSum = 0;
    let movementSum = 0;
    let waitingCount = 0;
    let movementCount = 0;

    for (let i = 0; i < telemetries.length; i++) {
      if (
        telemetries[i].boundaryEvents &&
        telemetries[i].boundaryEvents.length
      ) {
        let boundaryEvent = telemetries[i].boundaryEvents[0];
        boundaryEvents.push({
          event: boundaryEvent,
          timestamp: telemetries[i].timestamp,
          boundaryId: boundaryEvent.boundary_id,
        });
      }
    }

    for (let i = 1; i < boundaryEvents.length; i++) {
      if (boundaryEvents[i].event.detected_event === "exit") {
        movementCount = movementCount + 1;
        if (boundaryEvents[i]) {
          movementSum = parseInt(
            movementSum +
              Math.abs(
                boundaryEvents[i - 1].timestamp - boundaryEvents[i].timestamp
              )
          );
        }
      } else {
        waitingCount = waitingCount + 1;
        if (boundaryEvents[i]) {
          waitingSum = parseInt(
            waitingSum +
              Math.abs(
                boundaryEvents[i - 1].timestamp - boundaryEvents[i].timestamp
              )
          );
        }
      }
    }
    return waitingSum / waitingCount + movementSum / movementCount;
  }

  getAverageTravelTime(telemetries) {
    if (!telemetries) return [];
    if (telemetries.length <= 0) return [];

    let boundaryEvents = [];
    let enterEvents = [];
    let exitEvents = [];
    let averageBusStopTimes = [];

    for (let i = 0; i < telemetries.length; i++) {
      if (
        telemetries[i].boundaryEvents &&
        telemetries[i].boundaryEvents.length
      ) {
        let boundaryEvent = telemetries[i].boundaryEvents[0];
        boundaryEvents.push({
          event: boundaryEvent,
          timestamp: telemetries[i].timestamp,
          boundaryId: boundaryEvent.boundary_id,
        });
      }
    }

    for (let i = 0; i < boundaryEvents.length; i++) {
      if (boundaryEvents[i].event.detected_event === "enter") {
        enterEvents.push(boundaryEvents[i]);
      } else {
        exitEvents.push(boundaryEvents[i]);
      }
    }

    enterEvents.sort((a, b) => {
      return a.boundaryId - b.boundaryId;
    });
    exitEvents.sort((a, b) => {
      return a.boundaryId - b.boundaryId;
    });

    let count = 0;
    let sum = 0;
    let dest = 0;
    for (let i = 0; i < enterEvents.length; i++) {
      if (
        exitEvents[i + 1] !== undefined &&
        enterEvents[i].boundaryId === exitEvents[i + 1].boundaryId
      ) {
        if (enterEvents[i].timestamp && exitEvents[i].timestamp) {
          count = count + 1;
          sum =
            sum + Math.abs(enterEvents[i].timestamp - exitEvents[i].timestamp);
        }
      } else {
        if (
          enterEvents[i] &&
          exitEvents[i] &&
          enterEvents[i].timestamp &&
          exitEvents[i].timestamp
        ) {
          count = count + 1;
          sum =
            sum + Math.abs(enterEvents[i].timestamp - exitEvents[i].timestamp);
          let name = "";
          if (exitEvents[i + 1]) {
            name = `${enterEvents[dest].event.boundary.name} =/= ${
              exitEvents[i + 1].event.boundary.name
            }`;
          }
          averageBusStopTimes.push({
            busStop: name,
            averageTime: sum / count,
          });
          dest = i;
        }
        count = 0;
        sum = 0;
      }
    }
    return averageBusStopTimes;
  }

  getDateTime(date) {
    let newDate = new Date(date);
    let formattedDate = newDate.toISOString().slice(0, 19).replace("T", " ");
    let hours = newDate.getHours();
    let indicator = hours >= 12 ? "PM" : "AM";
    return `${formattedDate} ${indicator}`;
  }
}
module.exports = Helpers;
