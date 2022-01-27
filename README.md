# Interview Test

## Design and implement a node-js service that meets these criterias.

### Definitions:

Given the travel history of a vehicle as

- A collection of geolocation points and time stamp
- A collection of enter and exit events with time stamp for bus stops (identified by bus stop id) along the travel route

And given that this data has been provided for a period of one month.

1. Write an algorithm that generates the average time it takes to move between each bus stop along the route for the one month period.
2. Write an algorithm that given a date and time in future, returns the estimated date and time of arrival for the vehicle on this travel route

### Data:
The tables of interest on the db dump are vehicles, vehicle_telemetries and vehicle_boundary_events. Find the data needed on this repo `vehicle_telemetry.sql`

### Test Criteria:
* Use feature tests to demonstrate that the service meets the above criterias
* Typescript is preferred over Javascript
* We prefer slim controllers/transports, fat helpers/interactors
* Unit and integration tests are important

### How do I submit? ###
* Create a github repository, implement your solution and send us the link.
* Create a ReadMe file with `firstname-lastname.md` (where firstname and lastname are your 
  first and last name respectively) where you add relevant information on how to setup/run/test your submission
