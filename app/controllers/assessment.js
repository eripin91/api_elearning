/* global _ */

'use strict'

const async = require('async')
const assessmentModel = require('../models/assessment')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/assessment/detail/:assessmentId'
 *
 * @desc Get assessment detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.assessmentId - Id from assessment master
 *
 * @return {object} Request object
 */

exports.getDetail = (req, res) => {
  req.checkParams('assessmentId', 'assessmentId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-assessment-detail:${req.params.assessmentId}:${new Date().getTime()}` // disabled cache
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
      assessmentModel.getAssessmentDetail(req, req.params.assessmentId, (errAssessment, resultAssessment) => {
        cb(errAssessment, resultAssessment)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, _.result(resultAssessment, '[0]', {}))
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

/*
 * GET : '/assessment/get-questions/:parentId'
 *
 * @desc Get assessment detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.parentId - Id from course or material
 *
 * @return {object} Request object
 */

exports.getQuestions = (req, res) => {
  req.checkParams('parentId', 'parentId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-assessment-questions:${req.params.parentId}:${new Date().getTime()}` // disabled cache
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
      assessmentModel.getQuestions(req, req.params.parentId, (errAssessment, resultAssessment) => {
        cb(errAssessment, resultAssessment)
      })
    },
    (data, cb) => {
      const dataAssessment = []
      async.eachSeries(data, (item, next) => {
        if (!_.isEmpty(item.options)) {
          item.options = JSON.parse(item.options)
        }
        dataAssessment.push(item)
        next()
      }, err => {
        redisCache.setex(key, 81600, dataAssessment)
        cb(err, dataAssessment)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

/*
 * POST : '/assessment/get-questions-detail/:parentId/:qNo'
 *
 * @desc Get assessment detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.parentId - Id from course or material
 * @param  {objectId} req.params.qNo - Question number, eg: 1
 *
 * @return {object} Request object
 */

exports.getQuestionsDetail = (req, res) => {
  req.checkParams('parentId', 'parentId is required').notEmpty().isInt()
  req.checkBody('qNo', 'Question number is required').notEmpty().isInt()
  req.checkBody('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-assessment-question-detail:${req.body.userId}:${new Date().getTime()}` // disabled cache
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
      assessmentModel.getQuestionsDetail(req, req.params.parentId, req.body.qNo, req.body.userId, (errAssessment, resultAssessment) => {
        cb(errAssessment, resultAssessment)
      })
    },
    (data, cb) => {
      const dataAssessment = []
      async.eachSeries(data, (item, next) => {
        if (!_.isEmpty(item.options)) {
          item.options = JSON.parse(item.options)
        }
        dataAssessment.push(item)
        next()
      }, err => {
        redisCache.setex(key, 81600, dataAssessment)
        cb(err, dataAssessment)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, _.result(resultAssessment, '[0]', {}))
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

/*
 * GET : '/assessment/get-questions-number/:parentId'
 *
 * @desc Get assessment detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.parentId - Id from course or material
 *
 * @return {object} Request object
 */

exports.getQuestionsNumber = (req, res) => {
  req.checkParams('parentId', 'parentId is required').notEmpty().isInt()
  req.checkParams('userId', 'userId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const key = `get-assessment-questions-number:${req.params.userId}:${new Date().getTime()}` // disabled cache
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
      assessmentModel.getQuestionsNumber(req, req.params.parentId, req.params.userId, (errAssessment, resultAssessment) => {
        cb(errAssessment, resultAssessment)
      })
    },
    (data, cb) => {
      const dataAssessment = []
      let i = 1
      async.eachSeries(data, (item, next) => {
        item.no = i
        item.isAnswer = item.answer > 0 || false
        dataAssessment.push(item)
        ++i
        next()
      }, err => {
        redisCache.setex(key, 81600, dataAssessment)
        cb(err, dataAssessment)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}

/*
 * GET : '/assessment/answer/:parentId'
 *
 * @desc Get assessment detail
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.parentId - Id from course or material
 * @param  {objectId} req.body.userId - Id user
 * @param  {objectId} req.body.detailAssessmentId - Id from assessment detail
 * @param  {objectId} req.body.answer - answer of question
 *
 * @return {object} Request object
 */

exports.answer = (req, res) => {
  req.checkParams('parentId', 'parentId is required').notEmpty().isInt()
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('detailAssessmentId', 'detailAssessmentId is required').notEmpty().isInt()
  req.checkBody('answer', 'answer is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const userId = req.body.userId
  const detailAssessmentId = req.body.detailAssessmentId
  const parentId = req.params.parentId
  const answer = req.body.answer

  async.waterfall([
    (cb) => {
      assessmentModel.checkUserAlreadyAnswer(req, userId, detailAssessmentId, parentId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || errCheck) {
          cb(errCheck)
        } else {
          const data = {
            answer: answer,
            updated_at: new Date()
          }

          assessmentModel.updateUserAnswer(req, resultCheck[0].id, data, (err, resultUpdateAnswer) => {
            if (err) {
              cb(err)
            } else {
              console.log(resultUpdateAnswer)
              return MiscHelper.responses(res, resultUpdateAnswer)
            }
          })
        }
      })
    },
    (cb) => {
      const data = {
        userid: userId,
        detailassessmentid: detailAssessmentId,
        parentid: parentId,
        answer: answer,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      assessmentModel.insertUserAnswer(req, data, (err, result) => {
        cb(err, result)
      })
    }
  ], (errAssessment, resultAssessment) => {
    if (!errAssessment) {
      return MiscHelper.responses(res, resultAssessment)
    } else {
      return MiscHelper.errorCustomStatus(res, errAssessment, 400)
    }
  })
}
