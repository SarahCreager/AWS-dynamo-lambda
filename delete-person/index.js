const dynamoose = require('dynamoose');

exports.handler = async (event) => {

  //lines 7-14 connect to our dynamo db table

  // define a schema for dynamoose/dynamo db
  const peopleSchema = new dynamoose.Schema({
    'id': Number,
    'name': String,
    'role': String,
  })

  const peopleTable = dynamoose.model('people', peopleSchema);

  let data = null;
  let status = 500;
  let id = event.pathParameters.id;
  let idNum = parseInt(id);

  try {
    // get from the db for one ID and delete
    data = await peopleTable.delete(idNum);
    status = 200;
  } catch (e) {
    data = new Error(e);
    status = 400;
  }

  const response = {
    statusCode: status,
    body: JSON.stringify(data),
  };
  return response;
};