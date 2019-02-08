'use strict'

const async = require('async')
const discussionsModel = require('../models/discussions')
const notificationsModel = require('../models/notifications')
const usersModel = require('../models/users')
const redisCache = require('../libs/RedisCache')

/*
 * GET : '/discussions/get/:courseId'
 *
 * @desc Get discussions by course
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.courseId - Id course master
 *
 * @return {object} Request object
 */

exports.getThread = (req, res) => {
  const key = `get-thread-${req.params.courseId}-${req.params.userId}`
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
      discussionsModel.getThread(req, req.params.userId, req.params.courseId, (errThread, resultThread) => {
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

/*
 * GET : '/discussions/detail/:discussionId?sortBy={}&orderBy={}
 *
 * @desc Get discussions by course
 *
 * @param  {object} req - Parameters for request
 * @param  {objectId} req.params.discussionId - Id discussion master
 *
 * @return {object} Request object
 */

exports.getThreadDetail = (req, res) => {
  const key = `get-thread-detail-${req.params.discussionId}-${req.params.userId}-${req.query.sortBy}-${req.query.orderBy}`
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
      discussionsModel.getThreadDetail(req, req.params.discussionId, req.params.userId, req.query.sortBy, req.query.orderBy, (errThreadDetail, resultThreadDetail) => {
        cb(errThreadDetail, resultThreadDetail)
      })
    },
    (dataThreadDetail, cb) => {
      redisCache.setex(key, 600, dataThreadDetail)
      console.log('proccess cached')
      cb(null, dataThreadDetail)
    }
  ], (errDetail, resultDetail) => {
    if (!errDetail) {
      return MiscHelper.responses(res, resultDetail)
    } else {
      return MiscHelper.responses(res, errDetail)
    }
  })
}

/*
 * PUT : '/discussions
 *
 * @desc Post thread question
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.courseId - Id course master
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.content - thread content
 *
 * @return {object} Request object
 */

exports.insertThreadTitle = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('courseId', 'courseId is required').notEmpty().isInt()
  req.checkBody('content', 'title is required').notEmpty()

  const data = {
    userid: req.body.userId,
    courseid: req.body.courseId,
    post_title: '',
    post_content: req.body.content,
    parent: 0,
    status: 1,
    created_at: new Date(),
    updated_at: new Date()
  }

  discussionsModel.insertThreadTitle(req, data, (errInsert, resultInsert) => {
    if (!errInsert) {
      // delete redis thread by course
      const key = `get-thread-${req.body.courseId}-${req.body.userId}`
      redisCache.del(key)
      console.log(`${key} is deleted`)
      return MiscHelper.responses(res, resultInsert)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsert, 400)
    }
  })
}

/*
 * PUT : '/discussions/reply
 *
 * @desc Post thread reply
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.parentId - Id discussion master
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.content - thread content
 *
 * @return {object} Request object
 */

exports.insertThreadContent = (req, res) => {
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('parentId', 'parentId is required').notEmpty().isInt()
  req.checkBody('content', 'content is required').notEmpty()

  const userId = req.body.userId
  const parentId = req.body.parentId
  const content = req.body.content

  async.waterfall([
    (cb) => {
      const data = {
        userid: userId,
        post_title: '',
        post_content: content,
        parent: parentId,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      discussionsModel.insertThreadContent(req, data, (err) => {
        if (err) {
          return MiscHelper.responses(res, err, 400)
        } else {
          cb(null)
        }
      })
    },
    (cb) => {
      discussionsModel.checkThread(req, parentId, (errCheck, resultCheck) => {
        usersModel.checkUser(req, userId, (errUser, resultUser) => {
          if (!errUser) {
            resultCheck[0].name = resultUser[0].fullname
          }
          cb(errCheck, resultCheck[0])
        })
      })
    },
    (dataThread, cb) => {
      const message = `Pertanyaan anda "${dataThread.post_content}" Telah Dibalas Oleh "${dataThread.name}"`

      const data = {
        userid: dataThread.userid,
        message: message,
        status: 1,
        created_at: new Date(),
        updated_at: new Date()
      }

      notificationsModel.insert(req, data, (errInsert, resultInsert) => {
        const key = `get-thread-detail-${parentId}-${userId}-total_like-desc`
        redisCache.del(key)
        cb(errInsert, resultInsert)
      })
    }
  ], (errInsertContent, resultInsertContent) => {
    if (!errInsertContent) {
      return MiscHelper.responses(res, resultInsertContent)
    } else {
      return MiscHelper.errorCustomStatus(res, errInsertContent)
    }
  })
}

/*
 * POST : '/discussions/like
 *
 * @desc Post thread like
 *
 * @body  {object} req - body for request
 * @body  {objectId} req.body.discussionId - Id discussion master
 * @body  {objectId} req.body.userId - Id user master
 * @body  {objectId} req.body.status - like status
 *
 * @return {object} Request object
 */

exports.like = (req, res) => {
  req.checkBody('discussionId', 'discussionId is required').notEmpty().isInt()
  req.checkBody('userId', 'userId is required').notEmpty().isInt()
  req.checkBody('status', 'status is required').notEmpty().isInt()
  req.checkBody('courseId', 'courseId is required').notEmpty().isInt()

  const discussionId = req.body.discussionId
  const userId = req.body.userId
  const status = req.body.status
  const courseId = req.body.courseId

  async.waterfall([
    (cb) => {
      discussionsModel.checkLike(req, discussionId, userId, (errCheck, resultCheck) => {
        if (_.isEmpty(resultCheck) || (errCheck)) {
          cb(errCheck)
        } else {
          const data = {
            status: status,
            updated_at: new Date()
          }

          discussionsModel.updateLike(req, resultCheck[0].id, data, (err, resultUpdateLike) => {
            if (err) {
              cb(err)
            } else {
              const key = `get-thread-${courseId}-${userId}`
              const key2 = `get-thread-detail-${discussionId}-${userId}-total_like-desc`
              redisCache.del(key)
              redisCache.del(key2)
              return MiscHelper.responses(res, resultUpdateLike)
            }
          })
        }
      })
    },
    (cb) => {
      const data = {
        discussionid: discussionId,
        userid: userId,
        status: status,
        created_at: new Date(),
        updated_at: new Date()
      }

      discussionsModel.insertLike(req, data, (err, result) => {
        const key = `get-thread-${courseId}-${userId}`
        const key2 = `get-thread-detail-${discussionId}-${userId}-total_like-desc`
        redisCache.del(key)
        redisCache.del(key2)
        cb(err, result)
      })
    }
  ], (errLike, resultLike) => {
    if (!errLike) {
      return MiscHelper.responses(res, resultLike)
    } else {
      return MiscHelper.responses(res, errLike, 400)
    }
  })
}
