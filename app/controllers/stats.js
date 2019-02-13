/* global _ */

'use strict'

const async = require('async')
const statsModel = require('../models/stats')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/stats/detail/:userId'
 *
 * @desc Get stats detail per user
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.userId - userId
 *
 * @return {object} Request object
 */

exports.get = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-stats-detail:${req.params.userId}:${new Date().getTime()}` // disabled cache
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
      statsModel.getUserStatistic(req, req.params.userId, (errStats, resultStats) => {
        cb(errStats, _.result(resultStats, '[0]'))
      })
    }
  ], (errStats, resultStats) => {
    if (!errStats) {
      return MiscHelper.responses(res, resultStats)
    } else {
      return MiscHelper.errorCustomStatus(res, errStats, 400)
    }
  })
}

exports.getRank = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(req, req.validationErrors(true))
  }

  const key = `get-user-achievement:${req.params.userId}:${new Date().getTime()}`

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
      statsModel.getUserAchievementClass(req, req.params.userId, (errClass, resultClass) => {
        let data = {}
        if (resultClass === undefined) {
          data.message = 'Anda Belum Memiliki Achievement'
          cb(errClass, data.message)
        } else {
          data.rank_list = resultClass
          cb(errClass, data)
        }
      })
    },
    (dataClass, cb) => {
      if (dataClass.message !== undefined) {
        cb(null, dataClass)
      } else {
        async.eachSeries(dataClass.rank_list, (item, next) => {
          statsModel.getUserAchievementScore(req, item.classid, (errUserScore, resultUserScore) => {
            if (errUserScore) console.error(errUserScore)

            let index = resultUserScore.findIndex(x => x.userid === item.userid)
            let date = new Date(resultUserScore[index].created_at)
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

            item.class_name = resultUserScore[index].name
            item.message = 'Peringkat ' + index + ' di Kelas ' + item.class_name

            item.created_at = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
            next()
          })
        }, err => {
          redisCache.setex(key, 81600, dataClass)
          cb(err, dataClass)
        })
      }
    }
  ], (errUserScore, resultUserScore) => {
    if (!errUserScore) {
      return MiscHelper.responses(res, resultUserScore)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserScore, 400)
    }
  })
}

exports.getRankLimit = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(req, req.validationErrors(true))
  }

  const key = `get-user-achievement:${req.params.userId}:${new Date().getTime()}`

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
      statsModel.getUserAchievementClass(req, req.params.userId, (errClass, resultClass) => {
        let data = {}
        if (resultClass === undefined) {
          data.message = 'Anda Belum Memiliki Achievement'
          cb(errClass, data.message)
        } else {
          let dataLimit = resultClass.slice(0, 5)
          data.total_rank = resultClass.length
          data.rank_list = dataLimit
          cb(errClass, data)
        }
      })
    },
    (dataClass, cb) => {
      if (dataClass.message !== undefined) {
        cb(null, dataClass)
      } else {
        async.eachSeries(dataClass.rank_list, (item, next) => {
          statsModel.getUserAchievementScore(req, item.classid, (errUserScore, resultUserScore) => {
            if (errUserScore) console.error(errUserScore)

            let index = resultUserScore.findIndex(x => x.userid === item.userid)
            let date = new Date(resultUserScore[index].created_at)
            const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

            item.class_name = resultUserScore[index].name
            item.message = 'Peringkat ' + index + ' di Kelas ' + item.class_name

            item.created_at = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
            next()
          })
        }, err => {
          redisCache.setex(key, 81600, dataClass)
          cb(err, dataClass)
        })
      }
    }
  ], (errUserScore, resultUserScore) => {
    if (!errUserScore) {
      return MiscHelper.responses(res, resultUserScore)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserScore, 400)
    }
  })
}
