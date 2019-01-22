'use strict'

const async = require('async')
const discussionsModel = require('../models/discussions')
const redisCache = require('../libs/RedisCache')

exports.getThread = (req, res) => {
  const key = 'get-thread-' + req.params.courseId
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
      discussionsModel.getThread(req, req.params.courseId, (errThread, resultThread) => {
        cb(errThread, resultThread)
      })
    },
    (dataThread, cb) => {
      redisCache.setex(key, 600, dataThread)
      console.log('proccess cached')
      cb(null, dataThread)
    }
  ], (errThreads, resultThreads) => {
    if (!errThreads) {
      return MiscHelper.responses(res, resultThreads)
    } else {
      return MiscHelper.errorCustomStatus(res, errThreads)
    }
  })
}