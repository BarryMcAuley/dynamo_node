"use strict";

let AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-west-1",
    endpoint: "https://dynamodb.eu-west-1.amazonaws.com",
    accessKeyId: "REDACTED",
    secretAccessKey: "REDACTED"
});

let docClient = new AWS.DynamoDB.DocumentClient();

console.log("Querying for movies from 1992.");

const params = {
    TableName : "Movies",
    KeyConditionExpression: "#yr = :yyyy",
    ExpressionAttributeNames:{
        "#yr": "year",
    },
    ExpressionAttributeValues: {
        ":yyyy":1992
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.year + ": " + item.title);
            console.log(`   Rating: ${item.info.rating}/10`);
        });
    }
});
