const request = require('request')
const Joi = require('joi');

const fcmNotificationSchema = require("./schema").fcmNotificationSchema

const sendFCMNotifications = payload => {
    return new Promise((resolve, reject) => {       
        try {
            const { error: validationError } = Joi.validate(payload, fcmNotificationSchema);
            if (validationError === null) {
                var messagePayload = {
                    to: payload.deviceToken,
                    notification: {
                        title: payload && payload.notification && payload.notification.title,
                        body: payload && payload.notification && payload.notification.body
                    }
                };
        
                const dataString = JSON.stringify(messagePayload)
                const headers = {
                    'Authorization': `key=${payload.fcmServerKey}`, 'Content-Type': 'application/json', 'Content-Length': dataString.length
                }
                const options = { uri: 'https://fcm.googleapis.com/fcm/send', method: 'POST', headers: headers, json: messagePayload }
        
                request(options, function (err, res, body) {
                    if (err) reject(err)
                    else resolve(body)
                })
            } else {
                reject(validationError)
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports.sendFCMNotifications = sendFCMNotifications