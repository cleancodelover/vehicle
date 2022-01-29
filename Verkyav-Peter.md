# Interview Test

## Design and implement a node-js service that meets these criterias.

### Solution Description:
### Installation

- Clone the repository to your local directory using the command "git clone https://github.com/cleancodelover/shuttlers-api.git"
- Open the project in your favorite text editor
- Run "npm install" to install dependencies.
- Run "npm test" to run the test and watch the console for output.

### To start the server
- Run "nodemon start" to start the server.

### Endpoints
- "/vehicle/get-average-travel-time" - is the endpoint to get the average travel time of the vehicle in a month. where id is the vehicle id.
- "/vehicle/get-estimated-arrival-time" is the endpoint to get the estimated arrival time, given a future date. Where: "date" is the future date to commence journey.

NB: This assumes that the starting point is always thesame for the route.
