const Joi = require('joi');

module.exports.fcmNotificationSchema = Joi.object().keys({
    deviceToken: Joi.string().required(),
    fcmServerKey: Joi.string().required(),
    notification: Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
    }).required()
});

module.exports.apnsNotificationSchema = Joi.object().keys({
    APNSAuthKeyOrPemFilePath: Joi.string().required(),
    APNSAuthKeyID: Joi.string().required(),
    teamId: Joi.string().required(),
    topic: Joi.string().required(),
    isProduction: Joi.boolean(),
    tokens: Joi.array().required(),
    notification: Joi.object().keys({
        sound: Joi.string().required(),
        alert: Joi.string().required(),
        messageFrom: Joi.string().required(),
    }).required()
});