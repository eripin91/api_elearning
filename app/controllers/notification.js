/* global _ */

'use strict'

const async = require('async')
const notificationModel = require('../models/notifications')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()
  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }
  const key = `get-notification:${req.params.userId}:${new Date().getTime()}`
  async.waterfall([
    (cb) => {
      redisCache.get(key, users => {
        if (users) {
          return MiscHelper.responses(res, users)
        } else {
          cb(null)
        }
      }) 
    },
    (cb) => {
      notificationModel.get(req, req.params.userId, (errNorification, resultNotification) => {
        cb(errNorification, resultNotification)
      })
    }
  ], (errNorification, resultNotification) => {
    if (!errNorification) {
      return MiscHelper.responses(res, resultNotification)
    } else {
      return MiscHelper.errorCustomStatus(err, errNorification, 400)
    }
  })
}