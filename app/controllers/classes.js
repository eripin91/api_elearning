'use strict'

const async = require('async')
const classesModel = require('../models/classes')
const redisCache = require('../libs/RedisCache')

exports.get = (req, res) => {
  const key = 'get-class'
  async.waterfall([
    (cb) => {
      redisCache.get(key, classes => {
        if (classes) {
          return MiscHelper.responses(res, classes)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.get(req, (errClasses, resultClasses) => {
        cb(errClasses, resultClasses)
      })
    },
    (dataClasses, cb) => {
      redisCache.setex(key, 600, dataClasses)
      console.log('process cached')
      cb(null, dataClasses)
    }
  ], (errClasses, resultClasses) => {
    if (!errClasses) {
      return MiscHelper.responses(res, resultClasses)
    } else {
      return MiscHelper.errorCustomStatus(res, errClasses)
    }
  })
}

exports.getDetail = (req, res) => {
  const key = 'get-class-detail-' + req.params.classId
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
      classesModel.getDetail(req, req.params.classId, (errDetail, resultDetail) => {
        cb(errDetail, resultDetail)
      })
    },
    (dataDetail, cb) => {
      redisCache.setex(key, 600, dataDetail)
      console.log('prosess cached')
      cb(null, dataDetail)
    }
  ], (errDetails, resultDetails) => {
    if (!errDetails) {
      return MiscHelper.responses(res, resultDetails)
    } else {
      return MiscHelper.errorCustomStatus(res, errDetails)
    }
  })
}

exports.getRec = (req, res) => {
  const key = 'get-recommmendation'
  async.waterfall([
    (cb) => {
      redisCache.get(key, recommendation => {
        if (recommendation) {
          return MiscHelper.responses(res, recommendation)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.getRec(req, (errRec, resultRec) => {
        console.log('Arhammm')
        cb(errRec, resultRec)
      })
    },
    (dataRec, cb) => {
      redisCache.setex(key, 600, dataRec)
      console.log('process cached')
      cb(null, dataRec)
    }
  ], (errRecs, resultRecs) => {
    if (!errRecs) {
      return MiscHelper.responses(res, resultRecs)
    } else {
      return MiscHelper.errorCustomStatus(res, errRecs)
    }
  })
}
