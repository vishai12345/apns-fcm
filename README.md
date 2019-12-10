# apns-fcm
This package helps you to send notification very easy. You can send APNS notification and FCM notification as well.

npm install apns-fcm

const sendNotification = require("apns-fcm");

const fcmPayload = {
  deviceToken: 'deviceToken',
  fcmServerKey: 'fcmServerKey',
  notification: {
    title: "Account Deposit",
    body: "A deposit to your savings account has just cleared."
  }
}

const apnsPayload = {
    APNSAuthKeyOrPemFilePath: "./APNSAuthKeyOrPemFilePath.p8",
    APNSAuthKeyID: "APNSAuthKeyID",
    teamId: "teamId",
    topic: "com.topic",
    isProduction: isProduction,
    tokens: ["xxx", "xxxx"],
    notification: {
      sound: "ping.aiff",
      alert: "\uD83D\uDCE7 \u2709 You have a new message",
      messageFrom: 'John Appleseed',
  }
}

sendNotification(apnsPayload, "apns").then(console.log).catch(console.error)
sendNotification(fcmPayload, "fcm").then(console.log).catch(console.error)
