const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("uncaughtException at ", err.stack, err.message);
  process.exit(1);
});

const dotenv = require("dotenv").config({ path: "config.env" });
const app = require("./app");

const port = process.env.PORT;
const DB = process.env.DATABASE;

mongoose
  .connect(DB.replace("<password>", process.env.DATABASE_PASSWORD))
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err.message);
  });

const server = app.listen(port || 8000, () => {
  console.log("listening on port: ", port);
});

process.on("unhandledRejection", function () {
  (reason, promise) => {
    console.log("Unhandled Rejection at: ", promise, "reason: ", reason);
    server.close(() => {
      process.exit(1);
    });
  };
});


/*
require('dotenv').config({path: __dirname + '/../.env'})

const VONAGE_API_KEY = process.env.VONAGE_API_KEY
const VONAGE_API_SECRET = process.env.VONAGE_API_SECRET
const TO_NUMBER = process.env.VONAGE_TO_NUMBER
const VONAGE_BRAND_NAME = process.env.VONAGE_BRAND_NAME

const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: VONAGE_API_KEY,
  apiSecret: VONAGE_API_SECRET
})

const from = VONAGE_BRAND_NAME
const to = TO_NUMBER
const text = 'A text message sent using the Vonage SMS API'

async function sendSMS() {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();
*/
