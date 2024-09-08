# Software Testing Project 
This project was developed during the Software Testing course in college. It includes both unit and integration tests for a Node.js application. 
## Installation 
To install the project dependencies, run the following command:
 `npm install` 

## Running tests
### Important Note:

I haven't found a way to run unit and integration tests together yet. Therefore, you need to run them separately. Follow the instructions below to execute each type of test.

## Run unit tests
To run unit tests just paste the command below: 
**`npm test -- --findRelatedTests __tests__/userController/index.test.ts`**

## Run integration tests

 1. **Preparation**: First you need to comment out the singleton file located in root of the application;
2. **Execution**: After that, run the integration tests with the following command:
**`npm test -- --findRelatedTests __tests__/index.test.ts `**