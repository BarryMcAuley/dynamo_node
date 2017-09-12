"use strict";

let AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-1",
    endpoint: "https://dynamodb.eu-west-1.amazonaws.com",
    accessKeyId: "REDACTED",
    secretAccessKey: "REDACTED"
});

let docClient = new AWS.DynamoDB.DocumentClient()

const table = "Movies";

const year = 2015;
const title = "The Big New Movie";

const params = {
    TableName: table,
    Key:{
        "year": year,
        "title": title
    }
};

docClient.get(params, function(err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
