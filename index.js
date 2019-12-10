const sendFCMNotifications = require("./fcm").sendFCMNotifications
const sendAPNSNotifications = require("./apns").sendAPNSNotifications

const sendNotification = (payload, platform) => {
  return platform === "fcm" ? 
      sendFCMNotifications(payload) : 
          (platform === "apns" ? sendAPNSNotifications(payload) : new Promise((_, reject) => reject("Error: Pass platform value")))
}

module.exports = sendNotification