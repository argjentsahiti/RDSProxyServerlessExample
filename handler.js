'use strict';

const { database } = require('./connection');
const axios = require('axios')

const AWS = require("aws-sdk");

const lambda = new AWS.Lambda({
  apiVersion: '2015-03-31'
});


module.exports.hello = async (event) => {

  const data = await database.query('SELECT * FROM testtable')

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless 3v4.0!w Your function executed successfully!',
        input: event,
        data
      },
      null,
      2
    ),
  };
};

module.exports.testAxios = async (event) => {
  try {
    axios.defaults.timeout = 5000;
    const response = await axios.get('https://dua.com');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

module.exports.testLambdaInvoke = async (event) => {
  var params = {
    FunctionName: 'rds-vpc-test-function-dev-hello', /* required */
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: ''
  };

  var lambdaResponse = await lambda.invoke(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2=3.0! Your function executed successfully!',
        input: event,
        lambdaResponse
      },
      null,
      2
    ),
  };
}
