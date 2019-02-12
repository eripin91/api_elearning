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

/*
 * GET : '/users/:userId/classes'
 *
 * @desc Get user list
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - userId
 *
 * @return {object} Request object
 */

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
      cb(null, dataUserClass)
    }
  ], (errUserClass, resultUserClass) => {
    if (!errUserClass) {
      return MiscHelper.responses(res, resultUserClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserClass, 400)
    }
  })
}

/*
 * POST : '/users/login'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account user
 * @param  {objectId} req.body.password - password account user
 *
 * @return {object} Request object
 */

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
        if (_.result(dataUser, 'salt')) {
          if (MiscHelper.setPassword(req.body.password, dataUser.salt).passwordHash === dataUser.password) {
            cb(errUser, dataUser)
          } else {
            return MiscHelper.errorCustomStatus(res, 'Email or password is invalid!', 400)
          }
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
        delete user.password
        delete user.salt
        cb(err, user)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * GET : '/users/logout'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.headers - elearning-user userid
 *
 * @return {object} Request object
 */

exports.logout = (req, res) => {
  const userId = req.headers['e-learning-user']

  if (!userId) return MiscHelper.errorCustomStatus(res, 'UserID required.', 400)

  const data = {
    token: jsonwebtoken.sign({ iss: userId, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: '1 days' }),
    updated_at: new Date()
  }

  usersModel.update(req, userId, data, (err, updateUser) => {
    if (err || !updateUser) return MiscHelper.errorCustomStatus(res, err || 'Failed Logout.', 400)
    return MiscHelper.responses(res, 'success logout.')
  })
}

/*
 * GET : '/users/request-token'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {object} req.headers - userid and current-token
 *
 * @return {object} Request object
 */

exports.requestToken = (req, res) => {
  const userId = parseInt(req.headers['x-telkom-user'])
  const accessToken = req.headers['x-token-client']

  if (!userId || !accessToken) return MiscHelper.errorCustomStatus(res, 'UserID or access token required.', 400)

  async.waterfall([
    (cb) => {
      jsonwebtoken.verify(accessToken, CONFIG.CLIENT_SECRET, (err, decoded) => {
        cb(err, decoded)
      })
    },
    (token, cb) => {
      if (userId !== parseInt(token.iss)) {
        return MiscHelper.errorCustomStatus(res, 'Invalid auth token.', 400)
      } else {
        usersModel.getUserById(req, token.iss, (errUser, user) => {
          if (!user || errUser) return MiscHelper.errorCustomStatus(res, errUser || 'User not exists', 409)
          const dataUser = _.result(user, '[0]')
          if (_.result(dataUser, 'token')) {
            if (dataUser.token === accessToken) {
              cb(null, dataUser)
            } else {
              return MiscHelper.errorCustomStatus(res, 'Invalid auth token.', 400)
            }
          } else {
            return MiscHelper.errorCustomStatus(res, 'Invalid auth token.', 400)
          }
        })
      }
    },
    (user, cb) => {
      const data = {
        token: jsonwebtoken.sign({ iss: user.userid, type: 'mobile' }, CONFIG.CLIENT_SECRET, { expiresIn: '1 days' }),
        updated_at: new Date()
      }

      usersModel.update(req, user.userid, data, (err, updateUser) => {
        user.token = updateUser.token
        cb(err, user)
      })
    }
  ], (errAuth, resultAuth) => {
    if (!errAuth) {
      return MiscHelper.responses(res, resultAuth)
    } else {
      return MiscHelper.errorCustomStatus(res, errAuth, 400)
    }
  })
}

/*
 * POST : '/users/profile'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account user
 * @param  {objectId} req.body.password - password login
 * @param  {objectId} req.body.confpassword - confirm password login
 * @param  {objectId} req.body.fullname - fullname user
 * @param  {objectId} req.body.phone - phone user
 *
 * @return {object} Request object
 */

exports.profile = (req, res) => {
  req.checkBody('profile_picture', 'profile_picture is required').notEmpty()
  req.checkBody('fullname', 'fullname is required').notEmpty()
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('newemail', 'newemail is required').notEmpty()
  req.checkBody('phone', 'phone is required').notEmpty()

  const userId = req.headers['e-learning-user']
  const email = req.body.email
  const newemail = req.body.newemail

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      if (email !== newemail) {
        usersModel.getUserByEmail(req, newemail, (errUser, user) => {
          if (user && user.length > 0) return MiscHelper.errorCustomStatus(res, 'Email already exists, please choose another email.', 409)
          cb(errUser)
        })
      } else {
        cb(null)
      }
    },
    (cb) => {
      const data = {
        email: req.body.email,
        fullname: req.body.fullname,
        phone: req.body.phone,
        updated_at: new Date()
      }

      usersModel.update(req, userId, data, (err, updateUser) => {
        cb(err, updateUser)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/changepassword'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.oldpassword - password login
 * @param  {objectId} req.body.newpassword - password login
 * @param  {objectId} req.body.confpassword - confirm password login
 *
 * @return {object} Request object
 */

exports.changePassword = (req, res) => {
  req.checkBody('oldpassword', 'oldpassword is required').notEmpty()
  req.checkBody('newpassword', 'newpassword is required').notEmpty()
  req.checkBody('confpassword', "Confirm password don't match with password.").isMatch(req.body.newpassword)

  const userId = req.headers['e-learning-user']

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      usersModel.getUserById(req, userId, (errUser, user) => {
        if (!user) return MiscHelper.notFound(res, 'user not found on our database')
        cb(errUser, user)
      })
    },
    (dataUser, cb) => {
      if (_.result(dataUser, 'salt')) {
        if (MiscHelper.setPassword(req.body.oldpassword, dataUser.salt).passwordHash === dataUser.password) {
          const salt = MiscHelper.generateSalt(18)
          const passwordHash = MiscHelper.setPassword(req.body.password, salt)
          const data = {
            password: passwordHash.passwordHash,
            salt: passwordHash.salt
          }

          usersModel.update(req, userId, data, (err, updateUser) => {
            cb(err, updateUser)
          })
        } else {
          return MiscHelper.errorCustomStatus(res, 'Invalid old password.', 409)
        }
      } else {
        return MiscHelper.errorCustomStatus(res, 'Failed change password, please contact administrator.', 409)
      }
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, 'Password successfully changed.')
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/confirm'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.headers[x-telkom-user] - email account user
 * @param  {objectId} req.body.confirm_code - confirm code auth from email
 *
 * @return {object} Request object
 */

exports.confirm = (req, res) => {
  const userId = parseInt(req.headers['x-telkom-user'])
  req.checkBody('confirm_code', 'confirm_code is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      usersModel.getUserById(req, userId, (errUser, user) => {
        cb(errUser, _.result(user, '[0]'))
      })
    },
    (user, cb) => {
      if (user) {
        if (user.confirm_code === req.body.confirm_code) {
          const data = {
            confirm_code: '',
            confirm: 1,
            updated_at: new Date()
          }

          usersModel.update(req, user.userid, data, (err, updateUser) => {
            user.token = data.token
            delete user.password
            delete user.salt
            cb(err, user)
          })
        } else {
          return MiscHelper.errorCustomStatus(res, 'Invalid confirm code.', 400)
        }
      } else {
        return MiscHelper.errorCustomStatus(res, 'Invalid user.', 400)
      }
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}

/*
 * POST : '/users/register'
 *
 * @desc Login user account
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.body.email - email account user
 * @param  {objectId} req.body.password - password login
 * @param  {objectId} req.body.confpassword - confirm password login
 * @param  {objectId} req.body.fullname - fullname user
 * @param  {objectId} req.body.phone - phone user
 *
 * @return {object} Request object
 */

exports.register = (req, res) => {
  req.checkBody('email', 'email is required').notEmpty()
  req.checkBody('password', 'password is required').notEmpty()
  req.checkBody('confpassword', "Confirm password don't match with password.").isMatch(req.body.password)
  req.checkBody('fullname', 'fullname is required').notEmpty()
  req.checkBody('phone', 'phone is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      usersModel.getUserByEmail(req, req.body.email, (errUser, user) => {
        if (user && user.length > 0) return MiscHelper.notFound(res, 'Email already exists, please choose another email or do forgot password.')
        cb(errUser)
      })
    },
    (cb) => {
      const salt = MiscHelper.generateSalt(18)
      const passwordHash = MiscHelper.setPassword(req.body.password, salt)
      const data = {
        email: req.body.email,
        password: passwordHash.passwordHash,
        salt: passwordHash.salt,
        fullname: req.body.fullname,
        profile_picture: '',
        token: '',
        phone: req.body.phone,
        status: 1,
        confirm: 0,
        confirm_code: Math.floor((Math.random() * 9999) + 1000),
        created_at: new Date(),
        updated_at: new Date()
      }

      usersModel.insert(req, data, (err, insertUser) => {
        cb(err, insertUser)
      })
    }
  ], (errUser, resultUser) => {
    if (!errUser) {
      return MiscHelper.responses(res, resultUser)
    } else {
      return MiscHelper.errorCustomStatus(res, errUser, 400)
    }
  })
}
