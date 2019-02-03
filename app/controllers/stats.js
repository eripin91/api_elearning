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
        cb(errStats, resultStats)
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
