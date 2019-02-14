/* global _ */

'use strict'

const async = require('async')
const assessmentModel = require('../models/assessment')
const classesModel = require('../models/classes')
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
    },
    (dataAssessment, cb) => {
      assessmentModel.getTotalQuestion(req, req.params.assessmentId, (errAssessment, resultAssessmentTotal) => {
        let dataResultAssessmentTotal = JSON.stringify(resultAssessmentTotal)
        dataResultAssessmentTotal = JSON.parse(dataResultAssessmentTotal)

        let dataAssessmentObj = JSON.stringify(dataAssessment)
        dataAssessmentObj = JSON.parse(dataAssessmentObj)[0]

        dataAssessmentObj.totalEssay = _.result(_.filter(dataResultAssessmentTotal, o => {
          return o.question_type === 'essay'
        }), '[0]')

        dataAssessmentObj.totalSingleChoice = _.result(_.filter(dataResultAssessmentTotal, o => {
          return o.question_type === 'single-choice'
        }), '[0]')

        redisCache.setex(key, 81600, dataAssessmentObj)
        cb(errAssessment, dataAssessmentObj)
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
 * GET : '/assessment/get-questions/:parentId'
 *
 * @desc Get assessment question detail
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
      assessmentModel.getQuestionsDetail(req, req.params.parentId, req.body.qNo, (errAssessment, resultAssessment) => {
        redisCache.setex(key, 81600, resultAssessment)
        cb(errAssessment, resultAssessment)
      })
    },
    (data, cb) => {
      if (!_.result(data, '[0]')) {
        return MiscHelper.errorCustomStatus(res, 'Question not found.', 404)
      }

      assessmentModel.getUserAnswer(req, data[0].detailid, req.body.qNo, (errAnswer, userAnswer) => {
        data[0].user_answer = _.result(userAnswer, '[0].answer', '')
        cb(errAnswer, data)
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
 * @desc Get assessment questions
 *b
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
 * @desc Get assessment answer
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
  req.checkBody('parentId', 'parentId is required').notEmpty().isInt()
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('questionId', 'questionId is required').notEmpty().isInt()
  req.checkBody('answer', 'answer is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const userId = req.body.userId
  const detailAssessmentId = req.body.questionId
  const parentId = req.body.parentId
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
        const key = `get-assessment-rank:${req.params.classId}`
        redisCache.del(key)
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

/*
 * GET : '/assessment/rank/:classId'
 *
 * @desc Get rank by class
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.classId - Id from course or material
 *
 * @return {object} Request object
 */

exports.getRank = (req, res) => {
  req.checkParams('classId', 'classId is required').notEmpty().isInt()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  const userId = req.headers['e-learning-user']
  const key = `get-assessment-rank:${req.params.classId}:${new Date().getTime()}` // disabled cache
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
      classesModel.getRank(req, req.params.classId, (errRank, resultRank) => {
        cb(errRank, resultRank)
      })
    },
    (dataRank, cb) => {
      classesModel.getUserRank(req, userId, (errRank, userRank) => {
        const rank = {
          rank: dataRank,
          user: _.result(userRank, '[0]')
        }
        redisCache.setex(key, 81600, rank)
        cb(errRank, rank)
      })
    }
  ], (errRank, resultRank) => {
    if (!errRank) {
      return MiscHelper.responses(res, resultRank)
    } else {
      return MiscHelper.errorCustomStatus(res, errRank, 400)
    }
  })
}
