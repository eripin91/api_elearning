/* global _ */
'use strict'

const async = require('async')
const usersModel = require('../models/users')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  const key = 'get-user'
  async.waterfall([
    (cb) => {
      redisCache.get(key, (err, users) => {
        if (users) {
          return MiscHelper.responses(res, users)
        } else {
          cb(err)
        }
      })
    },
    (cb) => {
      usersModel.get(req, (errUsers, resultUsers) => {
        cb(errUsers, resultUsers)
      })
    },
    (dataUser, cb) => {
      redisCache.set(key, 600, dataUser)
      console.log('proccess cached')
      cb(null, dataUser)
    }
  ], (errUsers, resultUsers) => {
    if (!errUsers) {
      return MiscHelper.responses(res, resultUsers)
    } else {
      return MiscHelper.errorCustomStatus(res, errUsers, 400)
    }
  })
}
