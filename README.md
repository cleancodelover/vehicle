# Interview Test

## Solution Description:

### Installation
- Clone the repository to your local directory using the command [git clone https://github.com/cleancodelover/vehicle.git]()
- Open the project in your favorite text editor
- Add .env file in the project directory and add the following parameters"
  - APP_PORT=5000
  - NODE_ENV=development
- Run "npm install" to install dependencies.

### To run test
- Run "npm test" to run the test and watch the console for output.

### To start the server
- Run "nodemon start" to start the server.

### To replicate the error,
- Run test, and watch the console, the error is: TypeError: Cannot read properties of undefined (reading 'vehicleService').
- I am using Mocha and Chai as my test framework.

### Project Structure
- config - contains database configuration file
- dic - contains Dependency Injection Container factory
- controllers - contains controllers
- helpers - contains helper file with helper functions
- logger - contains custom logging system
- logs - contains a log file to log errors when in production
- models - contains the models for the associated database tables.
- routes - contains the endpoints
- services - contains services for database queries
- tests - contains tests.


### Endpoints
- [/vehicle/average-travel-time]() - is the average time it takes to move between each bus stop along the route for the one month period.
- [/vehicle/estimated-arrival-time/:date]() is the endpoint that returns the estimated date and time of arrival for the vehicle on this travel route, given a future date.