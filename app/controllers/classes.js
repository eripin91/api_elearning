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
        // console.log(resultClasses)
        resultClasses.map((classes) => {
          var minutes = Math.floor(classes.durasi / 60)
          var second = classes.durasi - (minutes * 60)
          classes.durasi = `${minutes}:${second}`
        })
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
  req.checkParams('classId', 'classId is required').notEmpty().isInt()
  const key = `get-class-detail-${req.params.classId}`
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
  const key = 'get-recommendation'
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
        resultRec.map((classes) => {
          var minutes = Math.floor(classes.durasi / 60)
          var second = classes.durasi - (minutes * 60)
          classes.durasi = `${minutes}:${second}`
        })
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

exports.rating = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('classId', 'classId is requires').notEmpty().isInt()
  req.checkBody('rating', 'rating is required').notEmpty().isInt()

  const userId = req.body.userId
  const classId = req.body.classId
  const rating = req.body.rating

  async.waterfall([
    (cb) => {
      classesModel.checkRating(req, userId, classId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || (errCheck)) {
          cb(errCheck)
        } else {
          console.log('data ada')
          const data = {
            rating: rating,
            updated_at: new Date()
          }

          classesModel.updateRating(req, resultCheck[0].id, data, (err, resultUpdateRating) => {
            if (err) {
              cb(err)
            } else {
              return MiscHelper.responses(res, resultUpdateRating)
            }
          })
        }
      })
    },
    (cb) => {
      const data = {
        userid: userId,
        classid: classId,
        rating: rating,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      classesModel.inserRating(req, data, (err, result) => {
        cb(err, result)
      })
    }
  ], (errRating, resultRating) => {
    if (!errRating) {
      return MiscHelper.responses(res, resultRating)
    } else {
      return MiscHelper.responses(res, errRating, 400)
    }
  })
}

