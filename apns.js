var apn = require('apn');
const Joi = require('joi');

const apnsNotificationSchema = require("./schema").apnsNotificationSchema

const sendAPNSNotifications = payload => {
  return new Promise((resolve, reject) => {
    try {
      const { error: validationError } = Joi.validate(payload, apnsNotificationSchema);
      if (validationError === null) {
        var options = {
          token: { 
            key: payload && payload.APNSAuthKeyOrPemFilePath,
            keyId: payload && payload.APNSAuthKeyID,
            teamId: payload && payload.teamId
          }, 
          production: !!(payload && payload.isProduction)
        };
        var apnProvider = new apn.Provider(options);
        
        const deviceTokens = Array.isArray((payload && payload.tokens)) && payload && payload.tokens
        
        var notification = new apn.Notification();
        notification.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        notification.badge = 1;
        notification.sound = (payload && payload.notification && payload.notification.sound) || "ping.aiff";
        notification.alert = (payload && payload.notification && payload.notification.alert);
        notification.payload = {'messageFrom': payload && payload.notification && payload.notification.messageFrom };
        notification.topic = payload && payload.topic;
  
        apnProvider.send(notification, deviceTokens).then( (result) => resolve(result));
      } else {
        reject(validationError)
      }
    } catch (error) {
      reject(error)
    }
  })
}

module.exports.sendAPNSNotifications = sendAPNSNotifications