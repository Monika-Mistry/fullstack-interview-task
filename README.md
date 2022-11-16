# Moneyhub Tech Test - Investments and Holdings

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the csv report to be sent as json
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
    2. How would you make this solution scale to millions of records?
    3. What else would you have liked to improve given more time?
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id
- `/investments/export/csv` get all user holdings as a csv **(NEW)**

### Changes

#### Tests
Tests have been added for new functionality added and mock calls to finanial companies API. The tests use `jest` and can be run with the following commands:

```bash
# To run the all tests once
npm run test

# To run tests and watch for changes
npm run test:watch
```

#### Dependencies
- Replaced deprecated dependency `request` with `axios`.
- Updated dependencies to latest versions.
- Added `jest` dependency for testing

#### Questions
1. How might you make this service more secure?
    * Encrypt the data in-transit
    * Ensure all user has permissions to make each of the API calls
    * Ensure user has permission to use admin API calls
    * More requirements gathering to determine how this exported user holdings data will be used. Ensure that there isn't more data provided than is necessary.
    * Making sure that users do not have extra access that they don't require
    * Assumptions were made for this task for security middleware, permissions access and PII safe protocols. Making sure that users are properly authenticated and authorised. And that access control is properly implemented within the services.
    * Ensuring the services are not using deprecated or out-of-date dependencies - only admin service dependencies were updated.

2. How would you make this solution scale to millions of records?
    * Make use of caching
    * Paginate responses from API calls
    * Process data in batches/chunks
    * Would need to handle large volumes of data in export. This would perhaps need to be broken down into smaller pieces to ensure this data can be sent or opened as a csv file. More information would be needed for how the exported data would be used to determine the best approach.

3. What else would you have liked to improve given more time?
    
    I spent the advised 1-2 hours on the task and there are a few things I would improve within the work I have done in the `admin` service. I have not opened a PR for this work as it is unfinished and requires some further work on the unit tests.

    * Fix test with resolved mock axios calls. I had some difficulties getting this test working with the time I had.
    * Improve functionality for processing investments data to csv. Find a more efficient way to duplicate investments with multiple holdings.
    * Use a csv library to generate csv file rather than a more manual generation which has been implemented.
    * Extend test suite to include more extensive testing for edge cases.
    * Better and more informative error handling within functions and API calls






