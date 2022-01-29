# Interview Test

## Solution Description:

### Installation
- Clone the repository to your local directory using the command [git clone https://github.com/cleancodelover/shuttlers-api.git]()
- Open the project in your favorite text editor
- Add .env file in the project directory and add the following parameters"
  - APP_PORT=5000
  - NODE_ENV=development
- Run "npm install" to install dependencies.

### To run test
- Run "npm test" to run the test and watch the console for output.

### To start the server
- Run "nodemon start" to start the server.

### Endpoints
- [/vehicle/get-average-travel-time]() - is the endpoint to get the average travel time of the vehicle in a month.
- [/vehicle/get-estimated-arrival-time/:date]() is the endpoint to get the estimated arrival time, given a future date. Where, "date" is the future date to commence journey.

### Project Structure
- config - contains database configuration file
- controllers - contains controllers
- helpers - contains helper file with helper functions
- logger - contains custom logging system
- logs - contains a log file to log errors when in production
- models - contains the models for the associated database tables.
- routes - contains the endpoints
- services - contains services for database queries
- tests - contains tests.