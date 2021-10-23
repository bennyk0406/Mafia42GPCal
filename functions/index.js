const functions = require("firebase-functions");
const express = require("express");

const app = express();

app.get("/product", (request, response) => {
  response.send("Hello from Express on Firebase!");
});

const api = functions.https.onRequest(app);

module.exports = {
  api
};