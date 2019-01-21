/* global _ */

'use strict'

const async = require('async')
const usersModel = require('../models/users')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/users/get'
 *
 * @desc Get user list
 *
 * @param  {object} req - Parameters for request
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  const key = 'get-user'
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
      usersModel.get(req, (errUsers, resultUsers) => {
        cb(errUsers, resultUsers)
      })
    },
    (dataUser, cb) => {
      redisCache.setex(key, 0, dataUser)
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

exports.getUserClass = (req, res) => {
  const key = 'get-user-class-' + req.params.userId
  async.waterfall([
    (cb) => {
      redisCache.get(key, userClass => {
        if (userClass) {
          return MiscHelper.responses(res, userClass)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      usersModel.getUserClass(req, req.params.userId, (errClass, resultClass) => {
        cb(errClass, resultClass)
      })
    },
    (dataUserClass, cb) => {
      redisCache.setex(key, 600, dataUserClass)
      console.log('prossess cached')
      cb(null, dataUserClass)
    }
  ], (errUserClass, resultUserClass) => {
    if (!errUserClass) {
      return MiscHelper.responses(res, resultUserClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserClass)
    }
  })
}
