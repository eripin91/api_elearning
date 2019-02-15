/* global _ */

'use strict'

const async = require('async')
const notificationsModel = require('../models/notifications')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-notification:${req.params.userId}:${new Date().getTime()}`

  async.waterfall([
    (cb) => {
      redisCache.get(key, detail => {
        if (detail) {
          return MiscHelper.responses(res, detail)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      notificationsModel.getNotification(req, req.params.userId, (errNotif, resultNotif) => {
        cb(errNotif, resultNotif)
      })
    },
    (dataNotif, cb) => {
      redisCache.setex(key, 600, dataNotif)
      console.log('proccess cached')
      cb(null, dataNotif)
    }
  ], (errNotif, resultNotif) => {
    if (!errNotif) {
      return MiscHelper.responses(res, resultNotif)
    } else {
      return MiscHelper.errorCustomStatus(res, errNotif)
    }
  })
}
