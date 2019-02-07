/* global _ */

'use strict'

const async = require('async')
const jsonwebtoken = require('jsonwebtoken')
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
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

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

exports.login = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()
  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      usersModel.getUserByEmail(req, req.body.email, (errUser, user) => {
        if (!user) return MiscHelper.notFound(res, 'Email not found on our database')
        const dataUser = _.result(user, '[0]')
        if (MiscHelper.setPassword(req.body.password, dataUser.salt).passwordHash === dataUser.password) {
          cb(errUser, dataUser)
        } else {
          return MiscHelper.errorCustomStatus(res, 'Email or password is invalid!', 400)
        }
      })
    },
    (user, cb) => {
      const data = {
        token: jsonwebtoken.sign({ iss: user.userid, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: '1 days' }),
        updated_at: new Date()
      }

      usersModel.update(req, user.userid, data, (err, updateUser) => {
        user.token = data.token
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser)
    }
  })
}
