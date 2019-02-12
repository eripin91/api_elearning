'use strict'

const async = require('async')
const classesModel = require('../models/classes')
const notificationsModel = require('../models/notifications')
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
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  const key = `get-class-detail-${req.params.classId}-${req.params.userId}`

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
      classesModel.getDetail(req, req.params.classId, req.params.userId, (errDetail, resultDetail) => {
        if (resultDetail.length === 0) {
          classesModel.getDetailClass(req, req.params.classId, (errData, resultData) => {
            resultData.map((detail) => {
              detail.is_join = 0
            })
            cb(errData, resultData[0])
          })
        } else {
          resultDetail.map((detail) => {
            detail.is_join = 1
          })
          cb(errDetail, resultDetail[0])
        }
      })
    },
    (dataDetail, cb) => {
      redisCache.setex(key, 600, dataDetail)
      console.log(`prosess cached ${key}`)
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

exports.getUserClass = (req, res) => {
  req.checkParams('userId', 'userId is required').notEmpty().isInt()
  const key = `get-user-class-${req.params.userId}`

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
      classesModel.getUserClass(req, req.params.userId, (errUserClass, resultUserClass) => {
        cb(errUserClass, resultUserClass)
      })
    },
    (dataUserClass, cb) => {
      redisCache.setex(key, 600, dataUserClass)
      console.log('proccess cached')
      cb(null, dataUserClass)
    }
  ], (errUserClasses, resultUserClasses) => {
    if (!errUserClasses) {
      return MiscHelper.responses(res, resultUserClasses)
    } else {
      return MiscHelper.errorCustomStatus(res, errUserClasses)
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
      const data = {
        userid: userId,
        classid: classId,
        rating: rating,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      classesModel.inserRating(req, data, () => {
        cb(null)
      })
    },
    (cb) => {
      classesModel.getAverageRating(req, classId, (err, avg) => {
        cb(err, avg)
      })
    },
    (ratingAvg, cb) => {
      const data = {
        rating: ratingAvg[0].rating
      }
      console.log(data)
      classesModel.updateRating(req, classId, data, (errUpdate, resultUpdate) => {
        const key = `get-class-detail-${classId}-${userId}`
        redisCache.del(key)
        cb(errUpdate, resultUpdate)
      })
    }
  ], (errRating, resultRating) => {
    if (!errRating) {
      return MiscHelper.responses(res, resultRating)
    } else {
      return MiscHelper.errorCustomStatus(res, errRating, 400)
    }
  })
}

exports.insertUserClass = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('classId', 'classId is requires').notEmpty().isInt()

  const userId = req.body.userId
  const classId = req.body.classId

  async.waterfall([
    (cb) => {
      const data = {
        userid: userId,
        classid: classId,
        score: 0,
        finished_at: new Date(),
        is_completed: 0,
        certificate: '',
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      classesModel.insertUserClass(req, data, (err) => {
        if (err) {
          return MiscHelper.errorCustomStatus(res, err, 400)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      classesModel.checkDetailClass(req, classId, (errDetail, resultDetail) => {
        cb(errDetail, resultDetail)
      })
    },
    (dataDetail, cb) => {
      const message = `Selamat Anda Telah Bergabung di Kelas ${dataDetail[0].name}`
      const data = {
        userid: userId,
        message: message,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      notificationsModel.insert(req, data, (errInsert, resultInsert) => {
        // delete redis user detail
        const key = `get-user-class-${userId}`
        redisCache.del(key)
        cb(errInsert, resultInsert)
      })
    }
  ], (errInsertClass, resultInserClass) => {
    if (!errInsertClass) {
      return MiscHelper.responses(res, resultInserClass)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsertClass)
    }
  })
}
